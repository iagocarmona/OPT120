import 'dart:convert';

ActivityModel activityFromJson(String str) =>
    ActivityModel.fromJson(json.decode(str));

String activityToJson(ActivityModel data) => json.encode(data.toJson());

class ActivityModel {
  String title;
  String description;
  DateTime date;

  ActivityModel({
    required this.title,
    required this.description,
    required this.date,
  });

  factory ActivityModel.fromJson(Map<String, dynamic> json) => ActivityModel(
        title: json["title"],
        description: json["description"],
        date: DateTime.parse(json["date"]),
      );

  Map<String, dynamic> toJson() => {
        "title": title,
        "description": description,
        "date":
            "${date.year.toString().padLeft(4, '0')}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}",
      };
}
