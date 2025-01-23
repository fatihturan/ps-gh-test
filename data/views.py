from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SportsNews, TeamNews, PlayerNews, SportsTweet
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser
import logging

log = logging.getLogger('json')


class SportsNewsBulkCreateView(APIView):
    """
    API view to create multiple SportsNews entries from a list of JSON objects.
    """
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):

        # Ensure that the data is a list
        if not isinstance(request.data, list):
            return Response({'error': 'Expected a list of objects'}, status=status.HTTP_400_BAD_REQUEST)

        # Iterate over the list of data and create SportsNews objects
        created_objects = []
        for item in request.data:
            try:
                # Create or update SportsNews instance unique by url
                created = False
                try:
                    sports_news = SportsNews.objects.get(url=item.get('url'))
                    sports_news.title=item.get('title')
                    sports_news.league=item.get('league')
                    sports_news.published=item.get('published')
                    sports_news.author=item.get('author')
                    sports_news.domain=item.get('domain')
                    sports_news.title_from_site=item.get('title_from_site')
                    sports_news.summary=item.get('summary')
                    sports_news.ai_summary=item.get('ai_summary')
                    sports_news.embeddings_string=item.get('embeddings_string')
                    sports_news.embeddings=item.get('embeddings')
                    sports_news.author_from_site=item.get('author_from_site')
                    sports_news.bettor_rating=item.get('bettor_rating')
                    sports_news.cover_image=item.get('cover_image')
                    sports_news.save()
                except ObjectDoesNotExist:
                    sports_news = SportsNews.objects.create(
                        title=item.get('title'),
                        league=item.get('league'),
                        published=item.get('published'),
                        author=item.get('author'),
                        url=item.get('url'),
                        domain=item.get('domain'),
                        title_from_site=item.get('title_from_site'),
                        summary=item.get('summary'),
                        ai_summary=item.get('ai_summary'),
                        embeddings_string=item.get('embeddings_string'),
                        embeddings=item.get('embeddings'),
                        author_from_site=item.get('author_from_site'),  
                        bettor_rating=item.get('bettor_rating'),
                        cover_image=item.get('cover_image')
                    )
                    created = True


                if created:
                    created_objects.append(sports_news)
                
                teams_string = item.get('teams')
                players_string = item.get('players')

                if teams_string:
                    teams = teams_string.split(',')
                    for team in teams:
                        if team == 'None':
                            continue
                        team = team.strip()
                        team_news, created = TeamNews.objects.get_or_create(
                            sports_news = sports_news,
                            team = team
                        )

                if players_string:
                    players = players_string.split(',')
                    for player in players:
                        if player == 'None':
                            continue
                        player = player.strip()
                        player_news, created = PlayerNews.objects.get_or_create(
                            sports_news = sports_news,
                            player = player
                        )

            except ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print("UNHANDLED EXCEPTION: ", e)
                continue

        return Response({'message': f'{len(created_objects)} SportsNews objects created successfully.'}, status=status.HTTP_201_CREATED)

class SportsTweetBulkCreateView(APIView):
    """
    API view to create multiple SportsNews entries from a list of JSON objects.
    """
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):

        # Ensure that the data is a list
        if not isinstance(request.data, list):
            return Response({'error': 'Expected a list of objects'}, status=status.HTTP_400_BAD_REQUEST)

        # Iterate over the list of data and create SportsNews objects
        created_objects = []
        for item in request.data:
            try:
                # Create or update SportsNews instance unique by url
                created = False
                try:
                    sports_tweet = SportsTweet.objects.get(url=item.get('url'))
                    sports_tweet.created_at=item.get('created_at')
                    sports_tweet.username=item.get('username')
                    sports_tweet.text=item.get('text')
                    sports_tweet.embeddings_string=item.get('embeddings_string')
                    sports_tweet.embeddings=item.get('embeddings')
                    sports_tweet.bettor_rating=item.get('bettor_rating')
                    sports_tweet.save()
                except ObjectDoesNotExist:
                    sports_tweet = SportsTweet.objects.create(
                        created_at=item.get('created_at'),
                        username=item.get('username'),
                        url=item.get('url'),
                        text=item.get('text'),
                        embeddings_string=item.get('embeddings_string'),
                        embeddings=item.get('embeddings'),
                        bettor_rating=item.get('bettor_rating')
                    )
                    created = True

                if created:
                    created_objects.append(sports_tweet)
                

            except ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print("UNHANDLED EXCEPTION: ", e)
                continue

        return Response({'message': f'{len(created_objects)} SportsNews objects created successfully.'}, status=status.HTTP_201_CREATED)