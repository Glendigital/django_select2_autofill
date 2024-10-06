from django.contrib.admin.widgets import AutocompleteSelect
from django.forms import Media

__all__ = [
    "AutofillAutocompleteSelect",
]


class AutofillAutocompleteSelect(AutocompleteSelect):
    def __init__(self, field, admin_site, attrs=None, choices=(), using=None):
        super().__init__(field, admin_site, attrs, choices, using)

        # Used by JavaScript to target autofill fields by model field name
        self.attrs["data-autofill"] = field.name

    @property
    def media(self):
        """Add autofill JavaScript to the rendered page when AutofillAutocompleteSelect widget is present."""

        media = super().media
        autofill_media = Media(js=["django_select2_autofill/js/autofill.js"])

        return media + autofill_media
