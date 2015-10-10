Template.registerHelper('cleanDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});
