import json
import os
from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()

STATIC_ROOT = os.path.join(settings.BASE_DIR, 'static')
manifest_path = STATIC_ROOT+'/front-end/chat/.vite/manifest.json'

@register.simple_tag
def vite_hmr_client():
    if settings.VITE_DEV_MODE:
        return mark_safe(
            f'<script type="module" src="{settings.VITE_DEV_SERVER_URL}/@vite/client"></script>'
        )
    return ''

@register.simple_tag
def vite_css_files(asset_name):
    if settings.VITE_DEV_MODE:
        return ''
    with open(manifest_path, 'r') as manifest_file:
        manifest = json.load(manifest_file)
    manifest_css_files = manifest[asset_name]["css"]
    styles = ""
    for css_file in manifest_css_files:
        styles += f'<link rel="stylesheet" href="{settings.STATIC_URL}front-end/chat/{css_file}" />'

    return mark_safe(styles)

@register.simple_tag
def vite_js_file(asset_name):
    if settings.VITE_DEV_MODE:
        return mark_safe(
            f"""
                <script type="module">
                    import RefreshRuntime from "{settings.VITE_DEV_SERVER_URL}/@react-refresh"
                    RefreshRuntime.injectIntoGlobalHook(window)
                    window.$RefreshReg$ = () => {{}}
                    window.$RefreshSig$ = () => (type) => type
                    window.__vite_plugin_react_preamble_installed__ = true
                </script>
                <script type="module" src="{settings.VITE_DEV_SERVER_URL}/{asset_name}"></script>
            """
        )
    else:
        with open(manifest_path, 'r') as manifest_file:
            manifest = json.load(manifest_file)
        
        manifest_js_file = manifest[asset_name]["file"]
        return mark_safe(
            f'<script type="module" src="{settings.STATIC_URL}front-end/chat/{manifest_js_file}"></script>'
        )
