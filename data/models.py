from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class SportsNews(models.Model):

    """
    Represents a Sports News Article and Embeddings
    """

    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    league = models.CharField(max_length=20,db_index=True)
    published = models.BigIntegerField(db_index=True)
    author = models.CharField(max_length=200)
    url = models.CharField(max_length=500, unique=True)
    domain = models.CharField(max_length=50, null=True)
    title_from_site = models.TextField(null=True)
    summary = models.TextField()
    ai_summary = models.TextField()
    embeddings_string = models.TextField()
    embeddings = ArrayField(models.FloatField())
    author_from_site = models.TextField(null=True)
    bettor_rating = models.IntegerField(null=True,db_index=True)
    cover_image = models.CharField(max_length=500, null=True)


class TeamNews(models.Model):

    """
    Represents a relationship between a sports news article and a team
    """

    sports_news = models.ForeignKey(SportsNews,on_delete=models.CASCADE)
    team = models.CharField(max_length=100, db_index=True)

    class Meta:
        unique_together = ('sports_news', 'team')

class PlayerNews(models.Model):

    """
    Represents a relationship between a sports news article and a player
    """

    sports_news = models.ForeignKey(SportsNews,on_delete=models.CASCADE)
    player = models.CharField(max_length=100, db_index=True)

    class Meta:
        unique_together = ('sports_news', 'player')

class SportsTweet(models.Model):

    """
    Represents a Sports Tweet and Embeddings
    """

    created_at = models.BigIntegerField(db_index=True)
    username = models.CharField(max_length=50)
    url = models.CharField(max_length=500, unique=True)
    text = models.TextField()
    embeddings_string = models.TextField()
    embeddings = ArrayField(models.FloatField())
    bettor_rating = models.IntegerField(null=True,db_index=True)

    






