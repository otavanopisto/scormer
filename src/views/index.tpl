<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Scormer</title>
</head>
<body>
<form method="get" action="/">
    Scorm dir:
    <input type="text" name="scorm_dir"></input>
    <button type="submit">Launch</button>
</form>
% if package:

% for leaf in package.leaves:
<a href="{{leaf.url}}" target="sco">{{leaf.path}}</a> 
% end

<iframe id="sco" src="about:blank" name="sco" width="800" height="1200"></iframe>

% end
<script src="/static/scorm.js"></script>
</body>
</html>