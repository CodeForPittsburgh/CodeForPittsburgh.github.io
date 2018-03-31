---
layout: project
title: NC Re-Entry Project
description: null
image: assets/images/re-entry.jpg
lead: Eric Jackson & Jason Marshall
url: 
published: true
---
## Purpose

Accessible, accurate and safe information on resources for those returning to the community after a period of incarceration or suffering the consequences of a criminal conviction on their record can be very hard to come by. Not only is the information dispersed across many different sites, but there is a tremendous amount of inaccurate, outdated information out there and a lot of places that are looking to exploit the vulnerable. The challenge is there not only for those contending with the issue, but also for those trying to help them: defense lawyers, parole officers, prison counselors, etc.

We built the [Buncombe Reentry Resources Hub](http://www.buncombereentryhub.org/) to provide up-to-date, accurate and safe links to national, state and local information and resources. The site is in use by the defense bar, DA's office, prison officials and reentering individuals. Now we are working to scale this resource to every county in North Carolina.

## Project Organization

There are 2 main components to the project: the public site and the administration tool. The implementation is spread across 4 separate repositories:

* Content for the NC site: [nc-reentry-resources-content](https://github.com/CodeForNC/nc-reentry-resources-content). The public website and the administrative tool operate off the same content directories.
* Public site implementation: [reentry-resources-hub](https://github.com/CodeForNC/reentry-resources-hub)
* Content adminstration API: [reentry-admin-api](https://github.com/CodeForNC/reentry-admin-api)
* Content administration UI code: [reentry-admin-ui](https://github.com/CodeForNC/reentry-admin-ui)

The content is stored as JSON, with common (national and NC) information separate from specific county information. If a county has no county-specific information beyond the county name, the public site code generates "localized" information based on 211 database queries using the county name as a filter. Otherwise, it pulls additional local descriptions and resources and merges them with the national/state information.

The public site and administrative front end codes use React. The adminstrative API back end uses Nodejs and GraphQL.

## How to contribute

You can find a list of unassigned tasks [here](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+org%3ACodeforNC+no%3Aassignee+). You can also look at issues in each of the individual repositories.

