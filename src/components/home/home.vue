<template>
  <div class="mdev-main-content">
    <hero-main v-view="(e) => changeNavBrand(e, '--teal-white')" :pageTitle="pageTitle" :headerDsc="headerDsc">
      <!-- Header Slot -->
      <div class="mdev-main-hero">
        <!-- Universal Image -->
        <universal-image class="--home-hero" source="MDEV-main-hero.png" a11y="MDEV Digital"></universal-image>
      </div>
    </hero-main>
    <!-- Process -->
    <home-process v-view="(e) => changeNavBrand(e, '--teal-white')" id="mainContent"></home-process>
    <!-- Services -->
    <home-services v-view="(e) => changeNavBrand(e, '--white-black')"></home-services>
    <!-- Case Studies -->
    <home-casestudies  v-view="(e) => changeNavBrand(e, '--teal-white')"></home-casestudies>
    <!-- About Us -->
    <home-about v-view="(e) => changeNavBrand(e, '--white-black')"></home-about>
    <!-- Testimonial -->
    <home-testimonials v-view="(e) => changeNavBrand(e, '--white-black')" :testimonials="testimonials"></home-testimonials>
    <!-- Footer -->
    <main-footer></main-footer>
  </div>
</template>

<script>
// Local Component registration
import HomeCaseStudies    from './home--casestudies.vue';
import HomeAbout          from './home--about.vue';
import HomeServices       from './home--services.vue';
import HomeProcess        from './home--process.vue';
import HomeTestimonials   from './home--testimonials.vue';
// Flat Data File
import MdevData           from '../../mdev-data.js';
import SEOData            from '../../site-seo.js';

export default{
  name: 'HomePage',

  data: function() {
    return {
      // Disables Page Title bar
      pageTitle: 'Humanize The Web',
      headerDsc: 'A picture of a skelleton watch against a dark marble texture. The words: Mdev Hybrid Digital Agency can be seen woven through the intricate lattices and gears.',
      // Testimonials loaded from flat file
      testimonials: MdevData.testimonials,
      // SEO
      seo: SEOData.siteSeo,
      // Staging Social URL
      // These variables allow for the creation of OG tags
      // for staging and prod. Change vars in site-seo.js!
      stagingBuild: SEOData.siteSeo.stagingBuild,
      liveUrl: SEOData.siteSeo.siteUrlLive,
      stageUrl: SEOData.siteSeo.siteUrlStaging
    };
  },

  // Meta SEO Function
  metaInfo() {
    return {
      title: this.seo.home.title,
      meta: [
        { vmid: 'twimage', name: 'twitter:image', content: (this.stagingBuild ? this.stageUrl : this.liveUrl) + this.loadImage(this.seo.home.twimage) },
        { vmid: 'ogimage', property: 'og:image', content: (this.stagingBuild ? this.stageUrl : this.liveUrl) + this.loadImage(this.seo.home.ogimage) },
        { vmid: 'ogtitle', property: 'og:title', content: this.seo.home.title + this.seo.templateAddon },
        { vmid: 'twtitle', name: 'twitter:title', content:  this.seo.home.title + this.seo.templateAddon },
        { vmid: 'desc', name: 'description', content: this.seo.home.desc },
        { vmid: 'twdesc', name: 'twitter:description', content: this.seo.home.desc },
        { vmid: 'ogdesc', property: 'og:description', content: this.seo.home.desc }
      ]
    };
  },

  components: {
    'home-about'        : HomeAbout,
    'home-services'     : HomeServices,
    'home-process'      : HomeProcess,
    'home-testimonials' : HomeTestimonials,
    'home-casestudies'  : HomeCaseStudies
  }
};
</script>
