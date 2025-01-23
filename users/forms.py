from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
import asyncio
from asgiref.sync import sync_to_async

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1']

    def clean_username(self):
        username = self.cleaned_data.get('username')

        if username and User.objects.filter(username__iexact=username).exists():
            raise forms.ValidationError('This username has already been taken!')
        return username

    def clean_email(self):
        email = self.cleaned_data.get('email')
        cleaned_data = super(UserRegisterForm, self).clean()

        if email and User.objects.filter(email__iexact=email).exists():
            self.add_error('email', 'This email address is already in use.')
        return email


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['email']

    def clean_email(self):
        # Get the email
        email = self.cleaned_data.get('email')

        # Check to see if any users already exist with this email as a username.
        try:
            match = User.objects.get(email=email)
        except User.DoesNotExist:
            # Unable to find a user, this is fine
            return email

        # A user was found with this as a username, raise an error.
        raise forms.ValidationError('This email address is already in use.')


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        #widgets = {'bio': forms.Textarea(attrs={'rows':1, 'cols':25})}
        # fields = ['image','bio','twitter_url','discord_Username','phone_number','email_following_posts','email_comments_posts']
        fields = ['image', 'bio', 'twitter_url']

class UserMultiSelectForm(forms.Form):
    async def async_init(self):
        obj_user = await sync_to_async(lambda: User.objects.filter(groups__name='data_access_user').exists())()
        if obj_user:
            choices = await sync_to_async(lambda: [(option.id, option.username) for option in User.objects.filter(groups__name='data_access_user')])()
            self.fields['options'] = forms.MultipleChoiceField(choices=choices, label="Select User", required=True)
        else:
            self.fields['options'] = forms.MultipleChoiceField(choices=(('None', 'None'),))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self.async_init())

