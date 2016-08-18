//菜单展合状态处理器
var ToggleHanlder = new Object();

Object.extend(ToggleHanlder ,{
  SourceObject : {},
  CookieName   : 'Toggle_State',
  RecordState : function(name,state) {
    if(state == "collapse") {
      this.SourceObject[name] = state;
    } else {
      if(this.SourceObject[name]) {
        delete(this.SourceObject[name]);
      }
    }
    var date = new Date();
    date.setTime(date.getTime() + 99999999);
   document.setCookie(this.CookieName, JSON.stringify(this.SourceObject), date.toGMTString());
  },

  Reset :function() {
    var date = new Date();
    date.setTime(date.getTime() + 99999999);
   document.setCookie(this.CookieName, "{}" , date.toGMTString());
  },

  Load : function()
  {
    if (document.getCookie(this.CookieName) != null)
    {
      this.SourceObject = eval("("+ document.getCookie(this.CookieName) +")");
      var items = document.getElementsByTagName('LI');
      for (var i = 0; i < items.length; i++)
      {
        if ( items[0].getAttribute("name") == "menu" && items[0].getAttribute("id") != '20_yun')
        {
          for (var k in this.SourceObject)
          {
            if ( typeof(items[i]) == "object")
            {
              if (items[i].getAttribute('key') == k)
              {
                toggleCollapseExpand(items[i], this.SourceObject[k]);
                collapse = false;
              }
            }
          }
        }
     }
    }
    document.getElementById('toggleImg').src = collapse ? 'images/menu_minus.gif' : 'images/menu_plus.gif';
    document.getElementById('toggleImg').alt = collapse ? collapse_all : expand_all;
  }
});