# FeedbackBox Setup

## Google Forms Setup

1. Go to https://forms.google.com
2. Create a new form
3. Add one question: "What features do you want in our product?" (Short answer or Paragraph)
4. Click Send > Link tab > Copy the link
5. Right-click the form page > View Source
6. Find the form action URL (looks like: `https://docs.google.com/forms/d/e/1FAIpQLSe.../formResponse`)
7. Find the input name (looks like: `entry.123456789`)

## Setup Your Google Form

1. Create a Google Form with one text question
2. Get your form ID and entry ID from the form source
3. Use them in the embed code data attributes

## Testing

### Standalone Test:
1. Open `demo.html` in browser
2. Test both script and iframe versions

### Embed in Another Website:
```html
<!-- Method 1: Script Tag -->
<script src="path/to/widget.js"></script>
<div id="feedbackbox-widget" 
     data-form="YOUR_FORM_ID" 
     data-entry="YOUR_ENTRY_ID"></div>

<!-- Method 2: iframe -->
<iframe src="path/to/widget.html" width="320" height="200"></iframe>

Note: For iframe method, you need to modify widget.html with your form details.
```

## Deployment

1. Upload files to your web server
2. Update paths in embed code to your server URLs
3. Test cross-origin functionality