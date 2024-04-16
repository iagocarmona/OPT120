import 'dart:convert';

ActivityModel activityFromJson(String str) =>
    ActivityModel.fromJson(json.decode(str));

String activityToJson(ActivityModel data) => json.encode(data.toJson());

class ActivityModel {
  int? id;
  String title;
  String description;
  DateTime date;

  ActivityModel({
    this.id,
    required this.title,
    required this.description,
    required this.date,
  });

  factory ActivityModel.fromJson(Map<String, dynamic> json) => ActivityModel(
        id: json["id"],
        title: json["titulo"],
        description: json["descricao"],
        date: DateTime.parse(json["data"]),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "description": description,
        "date":
            "${date.year.toString().padLeft(4, '0')}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}",
      };
}
