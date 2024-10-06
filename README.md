# django_select2_autofill

`django_select2_autofill` is a Django app that allows newly added Django admin inline
form fields to be automatically filled with data from the last user-selected option of
the same field in a form produced by a shared formset.

This allows for an end-user to more efficiently input new data in instances where
multiple field values may be shared across formset forms.

## Install

1. Add ``django_select2_autofill`` to your Django `INSTALLED_APPS` setting:

   ```python
   INSTALLED_APPS = [
      # ...
      "django_select2_autofill",
   ]
   ```

2. Use the ``AutofillAutocompleteSelect`` widget in the ``ModelForm`` containing
   ``autocomplete_fields``:

   ```python
   from django import admin
   from django import forms
   from django_select2_autofill import AutofillAutocompleteSelect

   from app.models import CustomModel


   class CustomForm(forms.ModelForm):
       class Meta:
           widgets = {
               "model_field_name": AutofillAutocompleteSelect(
                   CustomModel.model_field_name.field, admin.site
               ),
           }
   ```

   Note that ``admin.site`` can be replaced with a custom ``AdminSite`` instance, if
   necessary:

   ```python
   # ...
   widgets = {
       "model_field_name": AutofillAutocompleteSelect(
           CustomModel.model_field_name.field, CustomAdminSite()
       ),
   }
   ```
