async function getEntryName(formId) {
  let target = `https://docs.google.com/forms/d/e/${formId}/viewform`;
  let url = 'https://corsproxy.io/?' + encodeURIComponent(target);
  let text = await $.get(url);
  let params = $(text).find('div[jsmodel]').data('params');
  let i = params.indexOf('[[')+2;
  let j = params.indexOf(',', i);
  return 'entry.' + params.substring(i, j);
}

async function addScore() {
  let {formId} = await chrome.storage.local.get(['formId']);
  let score = +$('.end .correct').text().split(' ')[1];
  $.post(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
    [await getEntryName(formId)]: score,
  });
}

const interval = setInterval(() => {
  if ($('.end').css('display') == 'none') return;
  clearInterval(interval);
  addScore();
}, 100);