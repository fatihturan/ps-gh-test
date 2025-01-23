from django import forms
from .models import Comment
from .models import Post, BlogSports
from froala_editor.widgets import FroalaEditor


class NewCommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

        widgets = {
            'content': FroalaEditor(options={
                'placeholderText': '  Add a comment.',
                'toolbarInline': True,
                'toolbarButtons': ['bold', 'italic', 'underline', '|', 'insertLink', 'insertImage'],
                'quickInsertTags': "null",
                'attribution': False,
                'charCounterCount': False,
                'heightMin': 40,
            }),
        }


class PostForm(forms.ModelForm):
    related_sport = forms.ModelChoiceField(queryset=BlogSports.objects.exclude(name='Pine News').order_by('name'), empty_label="Select a Sport")
    class Meta():
        model = Post
        fields = ('title','content','draft','related_sport')

        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Your Title'}),
            'draft': forms.CheckboxInput(attrs={'class':'form-check-input ml-2','name':'draft_check','style':'visibility: hidden; display: none;'}),
            'content': FroalaEditor(options={

                #This activates inline mode
                #'toolbarInline': True,

                #This is a good inline toolbar
                #'toolbarButtons': ['bold', 'italic', 'underline', '|', 'outdent', 'indent', '|', 'formatOL', 'formatUL', '|','undo', 'redo'],

                #This defines what buttons are in the quick insert field (Plus sign with circle)
                #'quickInsertButtons': ['chart', 'image', 'video', 'table', 'ul', 'ol', 'hr'],

                # this pulls up the toolbar even if words are not highlighted (seems to get annoying)
                # 'toolbarVisibleWithoutSelection': True,

                # This is a good toolbar button if we decide against inline (html is added to debug). Defines for 2 screen sizes.
                'toolbarButtonsMD': ['bold', 'italic', 'underline', '|', 'alignLeft', 'alignCenter', 'alignRight', '|',
                                   'outdent', 'indent', '|', 'formatOL', 'insertLink', '|',
                                   'insertChart', 'insertImage', 'insertVideo', 'insertLink', '|', 'undo',
                                   'redo', 'html'],

                'toolbarButtonsSM': ['bold', 'italic', 'underline', '|', 'alignLeft', 'alignCenter', 'alignRight', '|',
                                   'outdent', 'indent', '|', 'formatOL', 'insertLink',
                                   'insertChart', 'insertImage', 'insertVideo', 'embedly','|', 'html'],

                'toolbarButtonsXS': ['bold', 'italic', 'underline', '-', 'insertChart', 'insertImage', 'insertVideo', 'embedly'],

                # This turns off the quick insert button
                'quickInsertTags': "null",

                #Turns off froala attribution
                'attribution': False,

                #Adds placeholder text
                'placeholderText': 'Tell us what you think. . . ',

                # This would be the max character count for a post.  The only issue is it displays at the bottom.
                #'charCounterMax': 5000,

                #Turns off character counter
                'charCounterCount': False,

                #Turns off video upload
                'videoUpload': False,

                #Only allows video by url, no embed or upload
                'videoInsertButtons': ['videoByURL'],

                #Removes image manager
                'imageInsertButtons': ['imageUpload', 'imageByURL'],

                # Removes text formatting when pasting content into the rich text editor, but keeps the content's structure.
                'pastePlain': True,
            }),
        }
