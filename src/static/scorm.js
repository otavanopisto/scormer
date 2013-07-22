+function() {
	var ScormApi = function ScormApi() {
		if (!(this instanceof ScormApi)) {
			return new ScormApi();
		}
		this.data = {
				"cmi._version": "1.0",
				
				"cmi.comments_from_learner._count": "0",
				"cmi.comments_from_lms._count": "0",
				"cmi.objectives._count": "0",
				"cmi.interactions._count": "0",
				"adl.data._count": "0",
				
				"cmi.completion_status": "false",
				"cmi.completion_threshold": "false",
				"cmi.credit": "no-credit",
				"cmi.entry": "",
				"cmi.exit": "normal",
				"cmi.launch_data": "",
				"cmi.learner_id": "1",
				"cmi.learner_name": "{lang=en}",
				"cmi.learner_preference": "",
				"cmi.location": "",
				"cmi.max_time_allowed": "P0S",
				"cmi.mode": "normal",
				"cmi.progress_measure": "0",
				"cmi.scaled_passing_score": "0",
				"cmi.score.raw": "0",
				"cmi.score.min": "0",
				"cmi.score.max": "0",
				"cmi.score.scaled": "0",
				"cmi.session_time": "0",
				"cmi.success_status": "no_credit",
				"cmi.suspend_data": "",
				"cmi.time_limit_action": "continue_no_message",
				"cmi.total_time": "P0S"
		};
		
		this.error = "0";
	};
	
	ScormApi.prototype.Initialize = function Initialize(param) {
		console.log("Initialize('" + param + "')")
		this.error = "0";
		return "true";
	};
	
	ScormApi.prototype.Terminate = function Terminate(param) {
		console.log("Terminate('" + param + "')")
		this.error = "0";
		return "true";
	};
	
	ScormApi.prototype.GetValue = function GetValue(param) {
		console.log("GetValue('" + param + "')")
		if (param in this.data) {
			this.error = "0";
			return this.data[param];
		} else {
			this.error = "401";
			return "";
		}
	};
	
	ScormApi.prototype.SetValue = function SetValue(key, value) {
		console.log("SetValue('" + key + "','" + value + "')")
		if (key in this.data) {
			this.error = "0";
			this.data[key] = value;
			return "true";
		} else {
			this.error = "401";
			return "false";
		}
	};
	
	ScormApi.prototype.Commit = function Commit(param) {
		console.log("Commit('" + param + "')")
		this.error = "0";
		return "true";
	};
	
	ScormApi.prototype.GetLastError = function GetLastError() {
		console.log("GetLastError()")
		return this.error;
	};
	
	ScormApi.prototype.GetErrorString = function GetErrorString(param) {
		console.log("GetErrorString('" + param + "')")
		return "";
	};
		
	ScormApi.prototype.GetDiagnostic = function GetDiagnostic(param) {
		console.log("GetDiagnostic('" + param + "')")
		return "";
	};
	
	window.API_1484_11 = new ScormApi();
	console.log("API_1484_11 created");
}();