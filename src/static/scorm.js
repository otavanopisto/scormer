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
	
	ScormApi.prototype.IsAddNewElement = function IsAddNewElement(key) {
		if (/cmi\.objectives\.[0-9]+\.id/.exec(key) ||
		  /cmi\.interactions\.[0-9]+\.id/.exec(key) ||
		  /cmi\.interactions\.[0-9]+\.objectives\.[0-9]+\.id/.exec(key) ||
		  /cmi\.comments_from_learner\.[0-9]+\.(?:comment|location|timestamp)/.exec(key)) {
			console.log("IsAddNewElement('" + key + "') == true");
			return true;
		} else {
			console.log("IsAddNewElement('" + key + "') == false");
			return false;
		}
	};
	
	ScormApi.prototype.AddNewElement = function AddNewElement(key, value) {
		console.log("AddNewElement('" + key + "','" + value + "')")
		var val;
		this.data[key] = value;
		if (/cmi\.objectives\.[0-9]+\.id/.exec(key)) {
			this.data["cmi.objectives._count"]++;
		}
		if (/cmi\.interactions\.[0-9]+\.id/.exec(key)) {
			this.data["cmi.interactions._count"]++;
		}
		if (val = /cmi\.interactions\.([0-9]+)\.objectives\.[0-9]+\.id/.exec(key)) {
			if (!("cmi.interactions." + val[1] + ".objectives._count" in this.data)) {
				this.data["cmi.interactions." + val[1] + ".objectives._count"] = 0;
			} 
			this.data["cmi.interactions." + val[1] + ".objectives._count"]++;
		}
		if (/cmi\.comments_from_learner\.[0-9]+\..*/.exec(key)) {
			this.data["cmi.comments_from_learner._count"]++;
		}
	}
	
	ScormApi.prototype.GetValue = function GetValue(param) {
		if (param in this.data) {
			console.log("GetValue('" + param + "') == '" + this.data[param] + "'")
			this.error = "0";
			return this.data[param];
		} else {
			this.error = "401";
			return "";
		}
	};
	
	ScormApi.prototype.SetValue = function SetValue(key, value) {
		console.log("SetValue('" + key + "','" + value + "')")
		
		if (this.IsAddNewElement(key)) {
			this.AddNewElement(key, value);
		}
		
		// if (key in this.data) {
		if (true) {
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