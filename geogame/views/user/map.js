function(doc) {
  for (i in doc.locations) { 
      emit([doc._id], doc.locations[i]);
  }
}
