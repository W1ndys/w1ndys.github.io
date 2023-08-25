/* global Fluid */

/**
 * Modified from https://blog.skk.moe/post/hello-darkmode-my-old-friend/
 */
(function(window, document) {
  var rootElement = document.documentElement;
  var colorSchemaStorageKey = 'Fluid_Color_Scheme';
  var colorSchemaMediaQueryKey = '--color-mode';
  var userColorSchemaAttributeName = 'data-user-color-scheme';
  var defaultColorSchemaAttributeName = 'data-default-color-scheme';
  var colorToggleButtonSelector = '#color-toggle-btn';
  var colorToggleIconSelector = '#color-toggle-icon';

  function setLS(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }

  function removeLS(k) {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  }

  function getLS(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }

  function getSchemaFromHTML() {
    var res = rootElement.getAttribute(defaultColorSchemaAttributeName);
    if (typeof res === 'string') {
      return res.replace(/["'\s]/g, '');
    }
    return null;
  }

  function getSchemaFromCSSMediaQuery() {
    var res = getComputedStyle(rootElement).getPropertyValue(
      colorSchemaMediaQueryKey
    );
    if (typeof res === 'string') {
      return res.replace(/["'\s]/g, '');
    }
    return null;
  }

  function resetSchemaAttributeAndLS() {
    rootElement.setAttribute(userColorSchemaAttributeName, getDefaultColorSchema());
    removeLS(colorSchemaStorageKey);
  }

  var validColorSchemaKeys = {
    dark : true,
    light: true
  };

  function getDefaultColorSchema() {
    // 取默认字段的值
    var schema = getSchemaFromHTML();
    // 如果明确指定了 schema 则返回
    if (validColorSchemaKeys[schema]) {
      return schema;
    }
    // 默认优先按 prefers-color-scheme
    schema = getSchemaFromCSSMediaQuery();
    if (validColorSchemaKeys[schema]) {
      return schema;
    }
    // 否则按本地时间是否大于 18 点或凌晨 0 ~ 6 点
    var hours = new Date().getHours();
    if (hours >= 18 || (hours >= 0 && hours <= 6)) { return 'dark'; } 'light'; function applycustomcolorschemasettings(schema) 接受从「开关」处传来的模式，或者从 localstorage 读取，否则按默认设置值 var current="schema" || getls(colorschemastoragekey) getdefaultcolorschema(); if (current="==" getdefaultcolorschema()) 当用户切换的显示模式和默认模式相同时，则恢复为自动模式 resetschemaattributeandls(); else (validcolorschemakeys[current]) rootelement.setattribute( usercolorschemaattributename, ); 特殊情况重置 return; 根据当前模式设置图标 setbuttonicon(current); 设置代码高亮 sethighlightcss(current); 设置其他应用 setapplications(current); invertcolorschemaobj="{" dark : 'light', light: 'dark' }; geticonclass(scheme) 'icon-' + scheme; togglecustomcolorschema() currentsetting="getLS(colorSchemaStorageKey);" (validcolorschemakeys[currentsetting]) 从 中读取模式，并取相反的模式 (currentsetting="==" null) 当 中没有相关值，或者 抛了 error 先按照按钮的状态进行切换 iconelement="document.querySelector(colorToggleIconSelector);" (iconelement) (!iconelement !validcolorschemakeys[currentsetting]) error，则读取默认值并切换到相反的模式 将相反的模式写入 setls(colorschemastoragekey, currentsetting); currentsetting; setbuttonicon(schema) (validcolorschemakeys[schema]) 切换图标 icon="getIconClass('dark');" (schema) iconelement.setattribute( 'class', 'iconfont ' 'data', invertcolorschemaobj[schema] 如果图标不存在则说明图标还没加载出来，等到页面全部加载再尝试切换 fluid.utils.waitelementloaded(colortoggleiconselector, function() }); (document.documentelement.getattribute('data-user-color-scheme')) color="getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg-color').trim()" document.queryselector('meta[name="theme-color" ]').setattribute('content', color) sethighlightcss(schema) 启用对应的代码高亮的样式 lightcss="document.getElementById('highlight-css');" darkcss="document.getElementById('highlight-css-dark');" (schema="==" 'dark') (darkcss) darkcss.removeattribute('disabled'); (lightcss) lightcss.setattribute('disabled', ''); lightcss.removeattribute('disabled'); darkcss.setattribute('disabled', settimeout(function() 设置代码块组件样式 document.queryselectorall('.markdown-body pre').foreach((pre)> {
        var cls = Fluid.utils.getBackgroundLightness(pre) >= 0 ? 'code-widget-light' : 'code-widget-dark';
        var widget = pre.querySelector('.code-widget-light, .code-widget-dark');
        if (widget) {
          widget.classList.remove('code-widget-light', 'code-widget-dark');
          widget.classList.add(cls);
        }
      });
    }, 200);
  }

  function setApplications(schema) {
    // 设置 remark42 评论主题
    if (window.REMARK42) {
      window.REMARK42.changeTheme(schema);
    }

    // 设置 cusdis 评论主题
    if (window.CUSDIS) {
      window.CUSDIS.setTheme(schema);
    }

    // 设置 utterances 评论主题
    var utterances = document.querySelector('.utterances-frame');
    if (utterances) {
      var utterancesTheme = schema === 'dark' ? window.UtterancesThemeDark : window.UtterancesThemeLight;
      const message = {
        type : 'set-theme',
        theme: utterancesTheme
      };
      utterances.contentWindow.postMessage(message, 'https://utteranc.es');
    }

    // 设置 giscus 评论主题
    var giscus = document.querySelector('iframe.giscus-frame');
    if (giscus) {
      var giscusTheme = schema === 'dark' ? window.GiscusThemeDark : window.GiscusThemeLight;
      const message = {
        setConfig: {
          theme: giscusTheme,
        }
      };
      giscus.contentWindow.postMessage({ 'giscus': message }, 'https://giscus.app');
    }
  }

  // 当页面加载时，将显示模式设置为 localStorage 中自定义的值（如果有的话）
  applyCustomColorSchemaSettings();

  Fluid.utils.waitElementLoaded(colorToggleIconSelector, function() {
    applyCustomColorSchemaSettings();
    var button = document.querySelector(colorToggleButtonSelector);
    if (button) {
      // 当用户点击切换按钮时，获得新的显示模式、写入 localStorage、并在页面上生效
      button.addEventListener('click', function() {
        applyCustomColorSchemaSettings(toggleCustomColorSchema());
      });
      var icon = document.querySelector(colorToggleIconSelector);
      if (icon) {
        // 光标悬停在按钮上时，切换图标
        button.addEventListener('mouseenter', function() {
          var current = icon.getAttribute('data');
          icon.classList.replace(getIconClass(invertColorSchemaObj[current]), getIconClass(current));
        });
        button.addEventListener('mouseleave', function() {
          var current = icon.getAttribute('data');
          icon.classList.replace(getIconClass(current), getIconClass(invertColorSchemaObj[current]));
        });
      }
    }
  });
})(window, document);
</=>