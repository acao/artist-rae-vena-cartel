## Setup

Install bundler dependencies:
``bundle install``

Install bower deps:
``cd source && bower install``

## Development

See: [Dugway docs](https://github.com/bigcartel/dugway)

``bundle exec dugway serve --watch``

Works a lot like jekyll or middleman

Uses sprockets for asset management:

theme.js
theme.css

Include dependencies here.

### Templates 
**IMPORTANT NOTE** Make sure to update template changes (all the .html files) using bigcartel's UI, and then to restart dugway as the remote templates are cached by dugway on serve. Annoying, I know.  They are in the git repo for recordkeeping.  Dugway is a system for *only* mocking up your store for development, and it seems they have promised deployment a year or two ago but alas.

### Dugway templates vs Angular templates

Note that you'll see template files with dugway (Liquid template system) markup and angular markup.  

Thus, when you use Angular templates, do this:
```liquid
{% raw %}
<div ng-controller="exampleCtrl" >
    {{stuff}}
</div>
{% endraw %}
```
Hope that saves you some headdesk moments - took me a few hours of pain to figure that one out, haha

## Deployment

I started migrating asset references in <head> etc to use the rawgit path for the repo.

``bundle exec dugway build``

``cd build && unzip <zipfilename>.zip``

Then add build deps and deploy

Why?

Because this was the easiest way to achieve something like Continuous Deployment without needing to use jenkins

## WHY?

Why sass and coffeescript? Thats what the original 'indie store' dugway theme came with

Why all these API's and third party services? Rae wanted it to be as free as possible to host, and I was concerned about security, so bigcartel was a good answer to that, rather than having to run a dinky little woocommerce site on a shared host or something.

If Rae is interested in paypal still, I've made a lot of progress with minicart.js & jekyll, using prose.io for an editing interface. Here is an example:
https://github.com/GuideToKulchur/press

She would probably not want to have to re-upload all her artwork though.

## Todo

- [ ] Fix alignment of nav
- [ ] Implement standalone off-canvas nav using media queries
- [ ] Add events view (galleries.js & galleries.html should be a boon here)
- [ ] Add available originals view, again galleries is helpful
- [ ] Fix gallery zoomwall (I swear it's based on order of DOM events)
- [ ] Add gallery year spacers (I'd suggest just uploading images to Prismic and using the load order property)
- [ ] Clean up store listing and store page layout and styles
