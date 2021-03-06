// [ Moreira Development ] Project Entry --------------------------
// Author: Lucas Moreira - l.moreira@live.ca

// [ Vue.js ] -------------------------------------------
import '@babel/polyfill'
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import Meta from 'vue-meta'
import App from './App.vue';

// Import Routes & Central Stores
import { routes  } from './routes.js';
//import store from './store/store.js';

// In Viewport Custom Directive -------------------------
// Adds classes to elements given the v-in-viewport directive
// can be used to target animations.
// To see an example, check buttons.css and the btn-primary.vue element
import inViewportDirective from 'vue-in-viewport-directive';
inViewportDirective.defaults.top = -100
Vue.directive('in-viewport', inViewportDirective);

// Check View Directive ---------------------------------
// Executes event as elements enter view
import checkView from 'vue-check-view';
Vue.use(checkView);
// Import Auth Plugin
// import Auth from './plugins/auth.js';
import Validate from './plugins/validate.js';
Vue.use(Validate);
// [ i18n - Internationalization ] ----------------------
// Load Locales
import en from './locales/en.js';
//import pt from './locales/pt.js';
const locales = {
  en
};

Vue.use(VueI18n);
// Vue Router
Vue.use(VueRouter);
// Meta Info
Vue.use(Meta)
// Auth Plugin
//Vue.use(Auth);

// Set Language Default [ ENGLISH ]
Vue.config.lang = 'en';

// Create Global Method for accepting language change
Vue.prototype.$locale = {
  change(lang) {
    Vue.config.lang = lang;
  },
  current() {
    return Vue.config.lang;
  }
};

// Set Key:value pairs for translation keys
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang]);
});
//-----------------------------------------------[ i18n ]
// [ Vue-Router ] ------------------------------------
// --------------------------------
// Server must be set to AWLAYWAS return
// [index.html] file for history mode to work.
//
// History mode in vue-router permits forgoing
// the ugly "#" hash syntax on Url's.

const router = new VueRouter ({
  routes: routes,
  mode: 'history',

  //Control Scrolling Behavior
  scrollBehavior( to, from, savedPosition ){
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    else if (savedPosition) {
      return savedPosition;
    }
    else {
      return { x: 0, y: 0 }
    }
  }
});
//--------------------------------------[ vue-router ]


// [ Global Mixins ] --------------------------------
// Global mixins are functions available to all of the components
// inside of the vue VM instance.
//
// These can be called with this.functioName(param); from
// any of the component methods.
Vue.mixin({
  methods: {
    // Load images with require
    // Returns path and tags image for webpack.
    loadImage(path){
      return require('./assets/images/' + path);
    },
    // Change Application Language - Toggle
    change() {
      let current = this.$locale.current();
      if (current === 'en') {
        this.$locale.change('pt');
      } else {
        this.$locale.change('en');
      }
    },
    // Change Navigation Logo Colors via class
    changeNavBrand(e, brandClass) {
      // Grab Element
      var mainNav = document.querySelectorAll('[data-main-nav]');
      if ( e.target.rect.y <= 0 ) {
        // Remove classes
        this.removeClass(mainNav, '--teal-black');
        this.removeClass(mainNav, '--white-black');
        this.removeClass(mainNav, '--teal-white');
        // Add intended class
        this.addClass(mainNav, brandClass);
      }
    },
    // Scroll to specific anchor link
    scrollToHash(hashRef, offset) {
      var element = document.querySelectorAll(hashRef);
      var top = element[0].offsetTop;
      window.scrollTo(0, top);
    },
    // Adjust position of crossbeam under logo
    adjustCrossbeam() {
      var brandEl = document.querySelectorAll('[data-main-nav]')[0];
      var crossEl = document.querySelectorAll('[data-crossbeam]');
      var brandHeight = null;
      brandHeight = brandEl.offsetHeight
      // Iterate through crossbeams (There is always two in prerender)
      for (var i=0; i < crossEl.length; i++) {
        crossEl[i].style.transform = 'translate3d(0,' + (brandHeight + 8) + 'px, 0)';
      }
    },
    // Checks Visibility of Element (vue-check-view npm)
    // Takes in event, amount of overlap and Array Length
    checkVisibility(event, overlap) {
      if (event.percentInView >= overlap) {
        if (event.type == 'exit') {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    },
    // Look Mom! - No JQUERY! ------------------------------
    // These are simple functions to replace dependency on
    // jquery UI. All we use it for is toggling classes..
    // there is no need to load a full library.
    //
    // Add Class JQUERY replacement
    addClass(element, className) {
      // Central Function
      const addCl = function( el, cl ) {
        if (el.classList) {
          el.classList.add(cl);
        }
        else {
          el.className += ' ' + cl;
        }
      }
      // Check for Multiple elements
      if ( element && element.length > 0 ) {
        for (var i=0; i < element.length; i++) {
          addCl(element[i], className);
        }
      }
      // Check for valid element
      else if ( element ) {
          addCl(element, className);
      }
      // Error
      else {
        // Output clean error
        console.log('ERROR | Element is not valid');
      }
    },
    // Remove Class
    removeClass(element, className) {
      // Central Function
      const rmCl = function ( el, cl ) {
        if (el.classList) {
          el.classList.remove(cl);
        }
        else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + cl.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }
      // Check for Multiple elements
      if (element && element.length > 0 ) {
        for (var i=0; i < element.length; i++) {
          rmCl(element[i], className);
        }
      }
      // Check for valid elements
      else if ( element ) {
        rmCl(element, className);
      }
      // ERROR
      else {
        // Output clean error
        console.log('ERROR | Element is not valid');
      }
    },
    // Check for class
    hasClass(element, className) {
      // Check for valid element
      if ( element ) {
        for (var i=0; i < element.length; i++) {
          if (element[i].classList) {
            element[i].classList.contains(className);
          }
          else {
            new RegExp('(^| )' + className + '( |$)', 'gi').test(element[i].className);
          }
        }
      }
      else {
        // Output clean error
        console.log('ERROR | Element is not valid');
      }
    },
    // Toggle Class
    toggleClass(element, className) {
      // Check for valid element
      if ( element ) {
        for (var i=0; i < element.length; i++) {
          if (element[i].classList) {
            element[i].classList.toggle(className);
          }
          else {
            var classes = element[i].className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
              classes.splice(existingIndex, 1);
            }
            else {
              classes.push(className);
            }
            element[i].className = classes.join(' ');
          }
        }
      }
      else {
        // Output clean error
        console.log('ERROR | Element is not valid');
      }
    },
    // Reset Body Class
    bodyReset(className) {
      var mainBody = document.querySelectorAll('body');
      this.removeClass(mainBody, className);
    },
    // Add Body Class
    bodyClass(className) {
      // Change body class
      var mainBody = document.querySelectorAll('body');
      this.addClass(mainBody, className);
    },
    // Async Load Scipts -----------------------------------
    // This script is a little trick to load scripts AFTER vue
    // has a chance to fully load. It serves the purpose of boosting
    // performance and fixing the issue with prerendered pages
    asyncScript( src, asyncLoad, deferLoad) {
      // Create a script element
      var script = document.createElement( 'script' );
      // Set Source
      script.setAttribute( 'src', src );
      // If async...
      if ( asyncLoad ) {
        script.setAttribute( 'async', true );
      }
      // if Defer
      if ( deferLoad ) {
        script.setAttribute( 'defer', true );
      }
      // Append to the end of the head
      document.head.appendChild( script );
    }
  }
})

// Global Component Registration
// Centralizes components to ease on loading
import HeroMain           from '../src/components/shared/hero-main.vue';
import MainFooter         from '../src/components/shared/main-footer.vue';
import BtnPrimary         from '../src/components/shared/btn-primary.vue';
import ChapterLink        from '../src/components/shared/chapter-link.vue';
import PreFooter          from '../src/components/shared/pre-footer.vue';
import SocialLinks        from '../src/components/shared/social-links.vue';
import UniversalImage     from '../src/components/modules/universal-img.vue';

// Global Component Assign
Vue.component('hero-main', HeroMain);
Vue.component('main-footer', MainFooter);
Vue.component('btn-primary', BtnPrimary);
Vue.component('chapter-link', ChapterLink);
Vue.component('pre-footer', PreFooter);
Vue.component('social-links', SocialLinks);
Vue.component('universal-image', UniversalImage);


// [ Main Vue Instance ] ----------------------------
const _vue = new Vue({
  el: '#app',
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBp0nBhc3N3b3Jk'
    }
  },
  router,
  render: h => h(App)
});
