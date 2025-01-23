from django.db import models
from django.contrib.auth.models import User

class Session(models.Model):
    # Primary key ID is created automatically
    session_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    summary = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, related_name="sessions", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # This will automatically update whenever the session is modified


    def save(self, *args, **kwargs):
        # Automatically generate a session_id if it's not set
        if not self.session_id:
            self.session_id = str(uuid.uuid4())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.summary[:50] if self.summary else f"Session {self.id}"

    class Meta:
        ordering = ['created_at']

class Chat(models.Model):
    chat_session_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name="chat_user", on_delete=models.CASCADE)
    question = models.TextField(blank=True, null=True)
    chat_history = models.TextField(blank=True, null=True)
    google_front_page = models.TextField(blank=True, null=True)
    temporary_answer = models.TextField(blank=True, null=True)
    tools_requested = models.TextField(blank=True, null=True)
    tools_used = models.TextField(blank=True, null=True)
    question_with_research = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)
    models_used = models.TextField(blank=True, null=True)
    cost = models.TextField(blank=True, null=True)
    thumbs_up = models.BooleanField(default=False)
    thumbs_down = models.BooleanField(default=False)
    is_pro = models.BooleanField(default=True)  # New field with default=True
    feedback = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.question[:50] if self.question else self.id
    
    class Meta:
        ordering = ['created_at']

# create a model to store survey responses

class Survey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    formId = models.CharField(max_length=255, null=False, default='default_form')  # Add default
    responseId = models.CharField(max_length=255, null=False, default='default_response')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Survey'
        verbose_name_plural = 'Surveys'

    def __str__(self):
        return f"Survey {self.formId} for {self.user.username}"
