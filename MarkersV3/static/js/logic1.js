fetch("json_sorted.json")
  .then(response => response.json())
  .then(json => console.log(json));
//var cdata2=realData.filter(obj=> obj.week_data_collected=="Fri, 01 Jan 2021 00:00:00 GMT" );