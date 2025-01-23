from django import template
from django.template.defaultfilters import stringfilter
from urllib.parse import quote, unquote
from bs4 import BeautifulSoup

register = template.Library()

@register.filter
@stringfilter
def upto(value, delimiter=None):
    return value.split(delimiter)[0]
upto.is_safe = True

#This is helpful when translating chart html names to common English.
# Replace underscore with space
@register.filter
@stringfilter
def replace_underscore(value):
    return value.replace("_", " ")
replace_underscore.is_safe = True

#Replace tilde with colon (for time values)
@register.filter
@stringfilter
def replace_tilde(value):
    return value.replace("~", ":")
replace_tilde.is_safe = True

#Removes paragraph tags
@register.filter
@stringfilter
def remove_ps(value):
    return value.replace("<p>", "").replace("</p>", "")
remove_ps.is_safe = True

#Replace space with %20 (for variables with a space)
@register.filter
@stringfilter
def uri_quote(value):
    return quote(value)
uri_quote.is_safe = True

#Replace %20 with space (for variables with a space)
@register.filter
@stringfilter
def uri_unquote(value):
    return unquote(value)
uri_quote.is_safe = True

@register.filter
@stringfilter
def remove_gt_lt(value):
    print("IN TAG")
    print(value)
    return value.replace("&lt", "<").replace("&gt", ">")
remove_gt_lt.is_safe = True