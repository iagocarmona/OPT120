import 'package:flutter/foundation.dart';
import 'package:mobile/src/controllers/activity_controller.dart';
import 'package:mobile/src/models/activity_model.dart';

class ActivityStore {
  final IActivityController controller;

  final ValueNotifier<bool> isLoading = ValueNotifier<bool>(false);

  final ValueNotifier<List<ActivityModel>> state =
      ValueNotifier<List<ActivityModel>>([]);

  final ValueNotifier<String> error = ValueNotifier<String>("");

  ActivityStore({required this.controller});

  Future<void> getActivities() async {
    isLoading.value = true;

    try {
      final result = await controller.getActivities();
      state.value = result;
    } catch (e) {
      if (kDebugMode) {
        print('error: $e');
      }
    }

    isLoading.value = false;
  }

  Future<void> createActivity(ActivityModel activity) async {
    isLoading.value = true;

    try {
      await controller.createActivity(activity);
      await getActivities();
    } catch (e) {
      if (kDebugMode) {
        print('error: $e');
      }
      error.value = e.toString();
    }

    isLoading.value = false;
  }

  Future<void> updateActivity(ActivityModel activity) async {
    isLoading.value = true;

    try {
      await controller.updateActivity(activity);
      await getActivities();
    } catch (e) {
      if (kDebugMode) {
        print('error: $e');
      }
      error.value = e.toString();
    }

    isLoading.value = false;
  }

  Future<void> deleteActivity(int id) async {
    isLoading.value = true;

    try {
      await controller.deleteActivity(id);
      await getActivities();
    } catch (e) {
      if (kDebugMode) {
        print('error: $e');
      }
      error.value = e.toString();
    }

    isLoading.value = false;
  }
}
