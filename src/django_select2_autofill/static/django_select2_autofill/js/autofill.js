// The autofill value store
const autofillFields = {};

// Execute after page is loaded to ensure jQuery is available
window.addEventListener("load", function() {
  (function($) {
    // Store autofill data when a Select2 option is selected
    // https://select2.org/programmatic-control/events#listening-for-events
    $("select[data-autofill]").on("select2:select select2:clear", function(event) {
      // Get the Django model field name for a given autofill form field
      const fieldType = $(this).data("autofill");

      if (fieldType && $(this).data("select2")) {
        autofillFields[fieldType] = $(this).select2("data")[0];
      }
    });

    // https://docs.djangoproject.com/en/5.1/ref/contrib/admin/javascript/#inline-form-events
    document.addEventListener("formset:added", (event) => {
      const field = event.target.querySelector("select[data-autofill]");
      const fieldType = field.dataset.autofill;

      if (fieldType && autofillFields[fieldType] && autofillFields[fieldType].element.value) {
        const value = autofillFields[fieldType].element.value;
        const text = autofillFields[fieldType].text;
        // Autofill the new inline form field with the previously selected option's value and text
        // https://select2.org/programmatic-control/add-select-clear-items#preselecting-options-in-an-remotely-sourced-ajax-select2
        const option = new Option(text, value, true, true);
        $(field).append(option).trigger("change");
        $(field).trigger({
          type: "select2:select",
          params: {
            data: {
              id: autofillFields[fieldType].element.value
            }
          }
        });
      }
    });
  })(django.jQuery)
});
