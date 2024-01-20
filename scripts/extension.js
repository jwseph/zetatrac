formIdInput.addEventListener('input', function () {
  chrome.storage.local.set({ formId: this.value });
});

chrome.storage.local.get(['formId']).then(({formId}) => {
  formIdInput.value = formId ?? '';
});