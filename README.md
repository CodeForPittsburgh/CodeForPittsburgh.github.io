# Code for Pittsburgh website

This Code for Pittsburgh's Jekyll-powered GitHub pages website. It's based on a heavily modified version the Forty Jekyll Theme by <a href="http://andrewbanchi.ch" target="_blank">Andrew Banchich</a>, which is based on the <a href="https://html5up.net" target="_blank">HTML5 UP</a> Forty Jekyll Theme by <a href="https://twitter.com/ajlkn" target="_blank">ajkln</a>. This code is free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

---

# Authoring Content

This, like all web pages hosted on GitHub, is a Jekyll-powered site, which is a thing that generates the entire site magically from  some templates that contain content authored in basic text files. Those basic text files are written in [Markdown](https://daringfireball.net/projects/markdown/). This means that you can author content for the site without coding.

For those unfamiliar with how Jekyll works, check out [jekyllrb.com](https://jekyllrb.com/) for all the details, 
or read up on just the basics of [front matter](https://jekyllrb.com/docs/frontmatter/), [writing posts](https://jekyllrb.com/docs/posts/), 
and [creating pages](https://jekyllrb.com/docs/pages/).

## Writing Blog Posts

To write a blog post, create a new markdown file in the `_posts` folder. Use the standard Jekyll dating format for titling the file: `YYYY-MM-DD-NameOfPost.md`. This is an out-of-the-box Jekyll convention. Once published, posts are accessed in a nested month/day/year folder on the site. Lists of posts are automatically generated for various other places on the site.

### Post Front-Matter

At the top of each post, you must add Jekyll front-matter using these categories: 

```
---
layout: post
title: name of your post here
description: a very short subtitle for your post
image: assets/images/aRepresentativeImageForYourPost.jpg
author: Your Name
---
```
^You can copy and paste this to get started.

After that, write your post in Markdown as you normally would, and push changes to the repository. It will be added to the blog list automatically. ~~If the date of your post is after the date you've pushed to the repo, the post won't actually publish until the date of your post.~~

## Adding Project Pages

Project pages on the website are succinct portfolio-style pages for our projects, used to showcase some of the work we've done. They are not intended to be the location for GitHub project pages themselves (for those, use actual repo-based [GitHub project pages](https://help.github.com/articles/user-organization-and-project-pages/))

Publishing project pages work exactly like posts, except they have slightly different front-matter. Under the hood, they use a different layout template file.

Create new markdown files in the `_projects` folder. Use a file name without spaces: `TheProjectName.md`

### Post Front-Matter

At the top of each post, add Jekyll front-matter using these categories:

```
---
layout: project
title: A CfP Project
description: a clever subtitle for the project
image: assets/images/aRepresentativeImageOfTheProject.jpg
lead: Name of person who lead the project
url: full url to the project web page (if any)
---
```

After that, write in markdown a description of the project. For projects, this can be short. This is not intended to be the location for the project itself, just a landing page! Include the link to the actual location of the project in the front matter `url` tag.

Push changes to the repository when done. It will be added to the project lists that appear throughout the site automatically.

## Home, Blog, and Projects pages

The website site is comprised of 3 main pages:

* the **home** page: core content is authored in `index.md`.
* the **blog** page: core content is authored in `blog.md`
* the **projects** page: core content is authored in `projects.md`

These markdown files live in the root of the directory folder, and they automatically get links on the site's menu.

Editing the corresponding markdown files will control titles and introductory material for each page. 

The other content on those pages, such as the tiled project and blog post lists, are controlled by the templates. To make deeper edits to the components that comprise these pages, you'll have to dig into `_layouts`, `_includes`, `_sass`, etc.

## Contact Information

* Social media links and icons are managed through `_config.yml`.
* ~~**[Formspree.io](https://formspree.io/) contact form integration ** - just add your email to the `_config.yml` and it works!~~ (currently turned off)

## Site Configuration

The `_config.yml` configuration file runs those show. Basic site information content (e.g., web site title, contact info, social media) and some important configuration settings that make the site work are stored here.

---

# Credits

We built this site on top of lots of other great projects:

## Forty by HTML5 UP
html5up.net | aj@lkn.io | @ajlkn

> This is Forty, my latest and greatest addition to HTML5 UP and, per its incredibly creative name, my 40th (woohoo)! It's built around a grid of "image tiles" that are set up to smoothly transition to secondary landing pages (for which a separate page template is provided), and includes a number of neat effects (check out the menu!), extra features, and all the usual stuff you'd expect. Hope you dig it!
> AJ
> aj@lkn.io | @ajlkn

## Forty Jekyll Theme by Andrew Banchich

https://github.com/andrewbanchich/Forty-Jekyll-Theme

## Icons:
* Font Awesome (fontawesome.github.com/Font-Awesome)

## Other:
* jQuery (jquery.com)
* html5shiv.js (@afarkas @jdalton @jon_neal @rem)
* background-size polyfill (github.com/louisremi)
* Misc. Sass functions (@HugoGiraudel)
* Respond.js (j.mp/respondjs)
* Skel (skel.io)
