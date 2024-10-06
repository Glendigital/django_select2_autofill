# django_select2_autofill

`django_select2_autofill` is a Django app that allows newly added Django admin inline
form autocomplete fields to be automatically filled with data from the last
user-selected option of the same autocomplete field in a form produced by a shared
formset.

This allows end-users to more efficiently input new data in instances where one value
may be shared across `ModelAdmin` formset form autocomplete fields.

## Install

1. With a Django project virtual environment activated:
   ```sh
   python -m pip install django-select2-autofill
   ```

2. Add `django_select2_autofill` to your Django `INSTALLED_APPS` setting:

   ```python
   INSTALLED_APPS = [
      # ...
      "django_select2_autofill",
   ]
   ```

3. Use the `AutofillAutocompleteSelect` widget in the `ModelForm` containing
   `autocomplete_fields`:

   ```python
   from django import admin
   from django import forms
   from django_select2_autofill import AutofillAutocompleteSelect


   class CustomForm(forms.ModelForm):
       class Meta:
           widgets = {
               "model_field_name": AutofillAutocompleteSelect(
                   CustomModel.model_field_name.field, admin.site
               ),
           }
   ```

   Note that `admin.site` can be replaced with a custom `AdminSite` instance, if
   necessary:

   ```python
   # ...
   from app.models import CustomModel


   # ...
   widgets = {
       "model_field_name": AutofillAutocompleteSelect(
           CustomModel.model_field_name.field, CustomAdminSite()
       ),
   }
   ```
