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

<br />
<iframe id="sco" src="about:blank" name="sco" width="800" height="1200"></iframe>

% end
<script src="/static/scorm.js"></script>

% if package:
% for i, obj in enumerate(package.objs):
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.id".format(i)}}'] = '{{obj}}';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.score.min".format(i)}}'] = '0';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.score.max".format(i)}}'] = '1';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.score.scaled".format(i)}}'] = '0';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.score.raw".format(i)}}'] = '0';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.success_status".format(i)}}'] = 'unknown';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.completion_status".format(i)}}'] = 'unknown';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.progress_measure".format(i)}}'] = '0';</script>
<script>window.API_1484_11.data['{{"cmi.objectives.{0}.description".format(i)}}'] = '';</script>
% end
<script>window.API_1484_11.data['cmi.objectives._count'] = '{{len(package.objs)}}';</script>
% end

</body>
</html>