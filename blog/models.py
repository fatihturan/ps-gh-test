from django.db import models
from django.contrib.auth.models import User
from urllib.parse import unquote
from django.conf import settings
from notifications.models import UserNotification as Notification
from django.db.models.signals import post_save, post_delete
#froala Editor
from froala_editor.fields import FroalaField
from bs4 import BeautifulSoup
from datetime import datetime
from django.utils.text import slugify
import html

#Overide Post.object.all()
class PostManager(models.Manager):
    def active(self, *args, **kwargs):
        return super(PostManager, self).filter(draft=False).filter(publish__isnull=False)

    def latestPublish(self, *args, **kwargs):
        return super(PostManager, self).filter(draft=False).filter(publish__isnull=False).order_by('-publish')[:200]

    def draft(self, *args, **kwargs):
        return super(PostManager, self).filter(draft=True)


class BlogSports(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Blog User Sports"
        verbose_name_plural = "Blog User Sports"

class Post(models.Model):

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = FroalaField(options={

        # This activates inline mode
        # 'toolbarInline': True,

        # This is a good inline toolbar
        # 'toolbarButtons': ['bold', 'italic', 'underline', '|', 'outdent', 'indent', '|', 'formatOL', 'formatUL', '|','undo', 'redo'],

        # This defines what buttons are in the quick insert field (Plus sign with circle)
        # 'quickInsertButtons': ['chart', 'image', 'video', 'table', 'ul', 'ol', 'hr'],

        # this pulls up the toolbar even if words are not highlighted (seems to get annoying)
        # 'toolbarVisibleWithoutSelection': True,

        # This is a good toolbar button if we decide against inline (html is added to debug). Defines for 2 screen sizes.
        'toolbarButtonsMD': ['bold', 'italic', 'underline', '|', 'alignLeft', 'alignCenter', 'alignRight', '|',
                             'outdent', 'indent', '|', 'formatOL', 'insertLink', '|',
                             'insertChart', 'insertImage', 'insertVideo', 'insertLink', '|', 'undo',
                             'redo', 'html'],

        'toolbarButtonsSM': ['bold', 'italic', 'underline', '|', 'alignLeft', 'alignCenter', 'alignRight', '|',
                             'outdent', 'indent', '|', 'formatOL', 'insertLink',
                             'insertChart', 'insertImage', 'insertVideo', 'embedly', '|', 'html'],

        'toolbarButtonsXS': ['bold', 'italic', 'underline', '-', 'insertChart', 'insertImage', 'insertVideo', 'embedly'],

        # This turns off the quick insert button
        'quickInsertTags': "null",

        # Turns off froala attribution
        'attribution': False,

        # Adds placeholder text
        'placeholderText': 'Tell us what you think. . . ',

        # This would be the max character count for a post.  The only issue is it displays at the bottom.
        # 'charCounterMax': 5000,

        # Turns off character counter
        'charCounterCount': False,

        # Turns off video upload
        'videoUpload': False,

        # Only allows video by url, no embed or upload
        'videoInsertButtons': ['videoByURL'],

        # Removes image manager
        'imageInsertButtons': ['imageUpload', 'imageByURL'],

        # Removes text formatting when pasting content into the rich text editor, but keeps the content's structure.
        'pastePlain': True,

    })
    date_posted = models.DateTimeField(auto_now_add=True) #blog created date
    likes = models.ManyToManyField(User,related_name='blog_posts',default=['0'])
    draft = models.BooleanField(default=False)
    publish = models.DateTimeField(auto_now=False, auto_now_add=False,blank=True, null=True) # blog posted date
    # dislikes= models.ManyToManyField(User,related_name='blog_post',default=0)
    last_edited_date = models.DateTimeField(auto_now=False, auto_now_add=False,blank=True, null=True)
    #related_sport = models.ForeignKey(BlogSports, on_delete=models.CASCADE, related_name='BlogSports',blank=True, null=True)
    related_sport = models.ForeignKey(BlogSports, on_delete=models.CASCADE, related_name='BlogSports')

    #removing score for now
    post_score = models.FloatField(default=0)

    #for send email following users and stop resend email if Author update or republish post
    sent_email = models.BooleanField(default=False,help_text="If True means email already sent for this post Author following users")

    objects = PostManager()

    #cutoffs for home page.
    sentence_cutoff = 100
    paragraph_cutoff = 200

    def author_string(self):
        return str(self.author)

    #Calculates score
    def score(self):

        if self.author.username == 'pine':
            score = 9999999999999
        else:
            now = datetime.now().timestamp()

            #only calculates scores for posts in the past seven days, otherwise reverts to publish date (for efficiency)
            #last_week = now - 604800

            # only calculates scores for posts in the past 3 days, otherwise reverts to publish date (for efficiency)
            last_week = now - 259200

            #gets timestamp of date published
            time_posted = self.publish.timestamp()

            if(time_posted > last_week):

                #each like is the equivalent of 10 minutes
                likes = self.likes.count() * 600

                #each comment is the equivalent of 20 minutes
                comments = self.number_of_comments * 1800

                #if it is an article, likes are multiplied by the amount of words/1000 --> this should give long quality articles a chance
                word_multiple = (self.word_count()/800) + 1
                likes = likes * word_multiple

                #add 20 minutes if post has an image or iframe(video or chart)
                if self.has_image() or self.has_iframes():
                    likes = likes + 1200

                #add another 20 minutes if it is a chart
                if self.has_charts():
                    likes = likes + 1200

                #check for profanity - to do later


                score = time_posted + likes + comments

            else:

                score = time_posted

        return score

    #To do - work on profanity score
    def profanity_score(self):

        profanity_score = 1

        return profanity_score

    def title_string(self):
        return html.unescape(self.title)

    def slug(self):

        # List of Stopwords
        STOPWORDS = ['a', 'about', 'above', 'after', 'again', 'ain', 'all', 'am', 'an', 'and', 'any', 'are',
                     'aren', "aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between',
                     'both', 'but', 'by', 'can', 'couldn', "couldn't", 'd', 'did', 'didn', "didn't", 'do', 'does',
                     'doesn', "doesn't", 'doing', 'don', "don't", 'down', 'during', 'each', 'few', 'for', 'from',
                     'further', 'had', 'hadn', "hadn't", 'has', 'hasn', "hasn't", 'have', 'haven', "haven't", 'having',
                     'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into',
                     'is', 'isn', "isn't", 'it', "it's", 'its', 'itself', 'just', 'll', 'm', 'ma', 'me', 'mightn',
                     "mightn't", 'more', 'most', 'mustn', "mustn't", 'my', 'myself', 'needn', "needn't", 'no', 'nor',
                     'not', 'now', 'o', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves',
                     'own', 're', 's', 'same', 'shan', "shan't", 'she', "she's", 'should', "should've",
                     'shouldn', "shouldn't", 'so', 'some', 'such', 't', 'than', 'that', "that'll", 'the', 'their',
                     'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
                     'too', 'until', 'up', 've', 'very', 'was', 'wasn', "wasn't", 'we', 'were', 'weren',
                     "weren't", 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with',
                     "won't", 'wouldn', "wouldn't", 'y', 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours',
                     'yourself', 'yourselves']

        title = ''.join(char for char in self.title if not char.isdigit())
        tokens = title.lower().split()
        keywords = [token for token in tokens if token not in STOPWORDS]

        slug = " ".join(keywords)

        # Clean up the slug using Django Slugify
        slug = slugify(slug)

        return slug

    # checks if post has an image
    def has_image(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.find_all('img') != []:
            return True
        else:
            return False

    # provides first url for first image
    def first_image(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.find_all('img') != []:
            #image_source = str(text.find_all('img')[0].get('src'))
            image_source = str(text.find_all('img')[0].get('src')).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/media/uploads/froala_editor/images/", "ik.imagekit.io/yqie9vdtbb4/")
            image_source = str(image_source).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/media/uploads/froala_editor/images/", "ik.imagekit.io/yqie9vdtbb4/")
            return image_source
        else:
            return "No Image"
    def first_image_classes(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.find_all('img') != []:
            classes = text.find_all('img')[0].get('class')
            classes_string = ' '.join(classes)

            return classes_string
        else:
            return ""


    def sport_image(self):
        return "https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{}.png".format(slugify(self.related_sport))

    def optimized_content(self):
        text = BeautifulSoup(self.content, "html.parser")
        #optimized = str(text)
        optimized = str(text).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/media/uploads/froala_editor/images/", "ik.imagekit.io/yqie9vdtbb4/")
        optimized = str(optimized).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/media/uploads/froala_editor/images/", "ik.imagekit.io/yqie9vdtbb4/")

        return optimized

    def word_count(self):
        text = BeautifulSoup(self.content, "html.parser")

        # We get the words within paragraphs
        text_p = (''.join(s.findAll(text=True)) for s in text.findAll('p'))
        counter = 0
        for y in text_p:
            for x in y.split():
                counter = counter+1

        return counter

    def read_minutes(self):
        word_count = self.word_count()
        minutes = int(round(word_count/250))
        if minutes == 0:
            minutes = 1

        return minutes

    #provides first paragraph
    def first_paragraph(self):
        text = BeautifulSoup(self.content, "html.parser")
        text = BeautifulSoup(str(text).replace("<br>", "</p><p>"), "html.parser")
        text = BeautifulSoup(str(text).replace("</br>", "</p><p>"), "html.parser")
        text = BeautifulSoup(str(text).replace("<br/>", "</p><p>"), "html.parser")
        if text.find_all('p') != []:
            counter = 0
            all_paragraphs = text.find_all('p')
            first_paragraph = all_paragraphs[0].get_text()
            while (len(first_paragraph) == 0 and counter < len(all_paragraphs)):
                first_paragraph = all_paragraphs[counter].get_text()
                counter = counter+1
            return first_paragraph
        else:
            return ""

    def first_paragraph_count(self):
        first_paragraph = self.first_paragraph()
        counter = 0
        for x in first_paragraph.split():
            counter = counter + 1
        return counter

    # provides first sentence
    def first_sentence(self):
        text = BeautifulSoup(self.content, "html.parser")
        text = BeautifulSoup(str(text).replace("<br>", "</p><p>"), "html.parser")
        text = BeautifulSoup(str(text).replace("</br>", "</p><p>"), "html.parser")
        text = BeautifulSoup(str(text).replace("<br/>", "</p><p>"), "html.parser")
        if text.find_all('p') != []:
            all_paragraphs = text.find_all('p')
            first_paragraph = all_paragraphs[0].get_text()

            #function to find first sentence if initial <p> has no words, e.g. contains image or chart
            counter = 1
            while (len(first_paragraph) == 0 and counter < len(all_paragraphs)):
                first_paragraph = all_paragraphs[counter].get_text()
                counter = counter+1

            first_sentence = first_paragraph

            beginning = ""

            done = False

            #This code parses the first sentence but does look for decimals and skips them to find the full first sentence
            #e.g., I like the Knicks at -2.5.
            counter = 0
            while (done == False):
                if first_sentence != first_paragraph.partition('.')[0]:
                    first_sentence = first_paragraph.partition('.')[0] + '.'
                    if first_paragraph.partition('.')[2][:1].isnumeric():
                        done = False
                    elif (first_paragraph.partition('.')[0][len(first_paragraph.partition('.')[0]) - 2:len(first_paragraph.partition('.')[0]) - 1] == " ") or (first_paragraph.partition('.')[0][len(first_paragraph.partition('.')[0]) - 2:len(first_paragraph.partition('.')[0]) - 1] == ":") or (first_paragraph.partition('.')[0][len(first_paragraph.partition('.')[0]) - 2:len(first_paragraph.partition('.')[0]) - 1] == "-"):
                        done = False
                    else:
                        done = True
                if first_sentence != first_sentence.partition('?')[0]:
                    first_sentence = first_sentence.partition('?')[0] + '?'
                    done = True
                if first_sentence != first_sentence.partition('!')[0]:
                    first_sentence = first_sentence.partition('!')[0] + '!'
                    done = True
                if done == False:
                    beginning = beginning + first_paragraph.partition('.')[0] + first_paragraph.partition('.')[1]
                    first_sentence = first_paragraph.partition('.')[2]
                    first_paragraph = first_paragraph.partition('.')[2]
                    if counter >= 10:
                        done = True

                counter = counter + 1
            first_sentence = beginning + first_sentence

            return first_sentence

        else:
            return ""

    def first_sentence_count(self):
        first_sentence = self.first_sentence()
        counter = 0
        for x in first_sentence.split():
            counter = counter + 1
        return counter

    def has_charts(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.findAll("div", {"class": "chart-div-3"}) != []:
            return True
        else:
            return False

    def used_charts(self):
        text = BeautifulSoup(self.content, "html.parser")
        all_charts = []
        if text.findAll("div", {"class": "chart-div-3"})  != []:
            chart_divs = text.findAll("div", {"class": "chart-div-3"})
            for chart in chart_divs:
                try:
                    chart_embeds = chart.findAll('embed')
                    chart_embed = chart_embeds[0]
                    chart_link = chart_embed.get("src")
                    chart_name = chart_link[chart_link.rfind('/')+1:]
                    chart_name = unquote(chart_name)
                    all_charts.append(chart_name)
                except:
                    pass
        return all_charts

    def first_chart(self):
        text = BeautifulSoup(self.content, "html.parser")
        first_chart = ""
        if text.findAll("div", {"class": "chart-div-3"}) != []:
            chart_divs = text.findAll("div", {"class": "chart-div-3"})
            found_first = False
            for chart in chart_divs:
                if found_first == False:
                    try:
                        chart_embeds = chart.findAll('embed')
                        chart_embed = chart_embeds[0]
                        first_chart = chart_embed.get("src")
                        found_first = True
                    except:
                        pass
        return first_chart

    def has_iframes(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.findAll("iframe") != []:
            return True
        else:
            return False

    def has_embedly(self):
        text = BeautifulSoup(self.content, "html.parser")
        if text.findAll("div", {"class": "fr-embedly "}) != []:
            return True
        elif text.findAll("div", {"class": "fr-embedly"}) != []:
            return True
        else:
            return False

    def first_embedly_domain(self):
        text = BeautifulSoup(self.content, "html.parser")
        embedly_domain = ""
        if text.findAll("a") != []:
            links= text.findAll("a")
            found_first = False
            for link in links:
                if found_first == False:
                    try:
                        first_embedly_domain = link.get("href")
                        first_embedly_domain = first_embedly_domain.split(":")[1][2:]
                        first_embedly_domain = first_embedly_domain.replace("www.", "")
                        first_embedly_domain = first_embedly_domain.replace("au.", "")
                        embedly_domain = first_embedly_domain.split(".")[0]
                        if embedly_domain == "sports":
                            try:
                                embedly_domain = first_embedly_domain.split(".")[1]
                            except:
                                pass
                        found_first = True
                    except:
                        pass
        return embedly_domain

    def embedly_icon(self):
        first_embedly_domain = self.first_embedly_domain()
        embedly_icon = 'images/logos/{}.png'.format(first_embedly_domain)
        return embedly_icon

    def first_link_src(self):
        text = BeautifulSoup(self.content, "html.parser")
        first_link_src = ""
        if text.findAll("a") != []:
            links= text.findAll("a")
            found_first = False
            for link in links:
                if found_first == False:
                    try:
                        first_link_src = link.get("href")
                        found_first = True
                    except:
                        pass
        return first_link_src

    def first_iframe_src(self):
        text = BeautifulSoup(self.content, "html.parser")
        first_iframe = ""
        if text.findAll("iframe") != []:
            iframes= text.findAll("iframe")
            found_first = False
            for iframe in iframes:
                if found_first == False:
                    try:
                        first_iframe_src = iframe.get("src")
                        found_first = True
                    except:
                        pass
        return first_iframe_src

    def first_iframe(self):
        text = BeautifulSoup(self.content, "html.parser")
        first_iframe = ""
        if text.findAll("iframe") != []:
            iframes= text.findAll("iframe")
            found_first = False
            for iframe in iframes:
                if found_first == False:
                    try:
                        first_iframe = str(iframe)
                        #first_iframe = "IFRAME GOES HERE"
                        found_first = True
                    except:
                        pass
        return first_iframe

    def has_user_references(self):
        text = BeautifulSoup(self.content, "html.parser")
        paragraphs = text.findAll("p")
        for paragraph in paragraphs:
            if "@" in paragraph.text:
                return True
        return False

    def referenced_users(self):
        text = BeautifulSoup(self.content, "html.parser")
        paragraphs = text.findAll("p")
        users = []
        for paragraph in paragraphs:
            p =  paragraph.text
            while (p.find("@") != -1):
                user = p[p.find("@") + 1:]
                if user.find(" ") != -1:
                    user = user[:user.find(" ")]
                if user.find(",") != -1:
                    user = user[:user.find(",")]
                if user.find(".") != -1:
                    user = user[:user.find(".")]
                if user.find("?") != -1:
                    user = user[:user.find("?")]
                if user.find("!") != -1:
                    user = user[:user.find("!")]
                users.append(user)
                p = p[p.find("@" + user) + len(user) + 1:]
        return users

    def all_comments(self):
        return self.comments.all().order_by('-date_posted')

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "/post/{}/{}/".format(self.pk, self.slug)
        #return reverse('stories:post-detail-noslug', kwargs={'pk': self.pk, 'slug': self.slug})

    @property
    def number_of_comments(self):
        return Comment.objects.filter(post_connected=self).count()

class Comment(models.Model):

    content = FroalaField()
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE) #commented user
    post_connected = models.ForeignKey(Post,related_name='comments', on_delete=models.CASCADE)
    likes= models.ManyToManyField(User,related_name='comment_posts',default=['0'])
    
    def user_comment_post(sender, instance, *args, **kwargs):

        obj_user_group = User.objects.filter(groups__name='notification_user')
        list_user = [str(i) for i in obj_user_group]
        comment = instance
        post = comment.post_connected
        text_preview = post.content[:90]
        sender = comment.author
        # Turns on notifications for everyone
        #if str(sender) in list_user :
        if True:
            notify = Notification(post=post, sender=sender, user=post.author,text_preview=text_preview, Notification_type=2)
            notify.save()
            userPostComments = Notification.objects.filter(Notification_type=2,post=post.id)
            comment_users=[]
            temp_user = [] #for remove duplicate user
            for i in userPostComments:
                if str(i.sender) not in temp_user:
                    temp_user.append(str(i.sender))
                    comment_users.append(i.sender)         
            for user_obj in comment_users:
                notify = Notification(post=post, sender=sender, user=user_obj,text_preview=text_preview, Notification_type=3)
                notify.save()                

    def user_comment_delete_post(sender, instance, *args, **kwargs):
        obj_user_group = User.objects.filter(groups__name='notification_user')
        list_user = [str(i) for i in obj_user_group]
        comment = instance
        post = comment.post_connected
        sender = comment.author
        # Turns on notifications for everyone
        # if str(sender) in list_user:
        if True:
            notify = Notification.objects.filter(post=post, user=post.author, sender=sender, Notification_type=2)
            notify.delete()

    def total_comments_likes(self):
        return self.likes.count()

    def has_user_references(self):
        text = BeautifulSoup(self.content, "html.parser")
        paragraphs = text.findAll("p")
        for paragraph in paragraphs:
            if "@" in paragraph.text:
                return True
        return False

    def referenced_users(self):
        text = BeautifulSoup(self.content, "html.parser")
        paragraphs = text.findAll("p")
        users = []
        for paragraph in paragraphs:
            p =  paragraph.text
            while (p.find("@") != -1):
                user = p[p.find("@") + 1:]
                if user.find(" ") != -1:
                    user = user[:user.find(" ")]
                if user.find(",") != -1:
                    user = user[:user.find(",")]
                if user.find(".") != -1:
                    user = user[:user.find(".")]
                if user.find("?") != -1:
                    user = user[:user.find("?")]
                if user.find("!") != -1:
                    user = user[:user.find("!")]
                users.append(user)
                p = p[p.find("@" + user) + len(user) + 1:]
        return users

    def __str__(self):
        return self.author.username

class Preference(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    post= models.ForeignKey(Post, on_delete=models.CASCADE)
    date= models.DateTimeField(auto_now_add= True)
    def user_liked_post(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        notify = Notification(post=post, sender=sender, user=post.author, Notification_type=1)
        notify.save()

    def user_unlike_post(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user

        notify = Notification.objects.filter(post=post, sender=sender, Notification_type=1)
        notify.delete()     

    def __str__(self):
        return str(self.user) + ' Liked ' + str(self.post) + 'Post'

class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_author = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True,related_name='comment_post_author')
    comment = FroalaField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add= True)
    comment_id = models.IntegerField(null=True,blank=True)

    def user_liked_comment_like(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        comment_id = like.comment_id
        comment_author = instance.comment_author
        text_preview = instance.comment
        notify = Notification(liked_comment_id=comment_id, post=post, sender=sender, user=comment_author, Notification_type=4, text_preview=text_preview)
        notify.save()

    def user_unlike_comment_like(sender, instance, *args, **kwargs):
        like = instance
        post = like.post
        sender = like.user
        comment_id = like.comment_id
        #("comment_id==",comment_id)
        comment_author = instance.comment_author
        text_preview = instance.comment
        notify = Notification.objects.filter(Notification_type=4, sender=sender, liked_comment_id=comment_id)
        notify.delete()

    def __str__(self):
        return str(self.user) + ' Liked ' + str(self.comment) + 'Comment'

#Comment Likes
post_save.connect(CommentLike.user_liked_comment_like, sender=CommentLike)
post_delete.connect(CommentLike.user_unlike_comment_like, sender=CommentLike)

#Likes
post_save.connect(Preference.user_liked_post, sender=Preference)
post_delete.connect(Preference.user_unlike_post, sender=Preference)

#comment signals
post_save.connect(Comment.user_comment_post, sender=Comment)
post_delete.connect(Comment.user_comment_delete_post, sender=Comment)


class Test_Schedule_Tasks(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name+" : "+str(self.created)