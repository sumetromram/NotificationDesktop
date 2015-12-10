/**
 *NotificationDesktop.js v1.0.0
 */


; (function (window) {

	var Notifications = window.Notification;

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	/**
	 * NotificationDesktop function
	 */
	function NotificationDesktop(options) {
		this.active = false;
		this.options = extend({}, this.options);
		extend(this.options, options);
	}
	
	/**
	 * show the notification
	 */
	NotificationDesktop.prototype.show = function () {
		this.permission(this.notification);
	}
	
	/**
	 * Request Permission the notification
	 */
	NotificationDesktop.prototype.requestPermission = function () {
		Notifications.requestPermission();
	}
	
	NotificationDesktop.prototype.notification = function () {
		if (Notifications) {
			if (!this.active) {
				var noti = new Notifications(this.options.title, {
					icon: this.options.icon,
					body: this.options.body,
					tag: this.options.tag
				});

				if (this.options.sound != null) {
					noti.addEventListener("show", function () {
						var audio = new Audio(this.options.sound);
						audio.play();
					}, false);
				}

				this.active = true;

				noti.addEventListener("close", function () {
					this.active = false;
				}, false);

				return noti;
			}

		} else {
			if ("webkitNotifications" in window) {
				alert("Looks like you support the old web notifications");
			} else {
				alert("You're browser doesn't support notifications.");
			}
		}
	}
	
	NotificationDesktop.prototype.permission = function (callback) {
		Notifications.requestPermission(function (permission) {
			if (permission === "granted") {
				callback();
			} else {
				alert("You'll need to allow permission");
			}
		});
	}

	/**
	* add to global namespace
	*/
	window.NotificationDesktop = NotificationDesktop;

})(window);