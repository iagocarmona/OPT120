import 'package:flutter/material.dart';

import '../settings/settings_view.dart';
import 'activity_item.dart';
import 'activities_details_view.dart';

/// Displays a list of SampleItems.
class ActivityItemListView extends StatelessWidget {
  const ActivityItemListView({
    super.key,
    this.items = const [
      ActivityItem(1, "Tarefa 1", 'Descrição 1', '2024-03-25'),
      ActivityItem(2, "Tarefa 2", 'Descrição 2', '2024-03-25'),
      ActivityItem(3, "Tarefa 3", 'Descrição 3', '2024-03-25'),
    ],
  });

  static const routeName = '/';

  final List<ActivityItem> items;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Atividades'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // Navigate to the settings page. If the user leaves and returns
              // to the app after it has been killed while running in the
              // background, the navigation stack is restored.
              Navigator.restorablePushNamed(context, SettingsView.routeName);
            },
          ),
        ],
      ),

      // To work with lists that may contain a large number of items, it’s best
      // to use the ListView.builder constructor.
      //
      // In contrast to the default ListView constructor, which requires
      // building all Widgets up front, the ListView.builder constructor lazily
      // builds Widgets as they’re scrolled into view.
      body: ListView.builder(
        // Providing a restorationId allows the ListView to restore the
        // scroll position when a user leaves and returns to the app after it
        // has been killed while running in the background.
        restorationId: 'sampleItemListView',
        itemCount: items.length,
        itemBuilder: (BuildContext context, int index) {
          final item = items[index];

          return ListTile(
              title: Text(item.title),
              subtitle: Text(item.description),
              leading: const CircleAvatar(
                // Display the Flutter Logo image asset.
                foregroundImage: AssetImage('assets/images/flutter_logo.png'),
              ),
              onTap: () {
                // Navigate to the details page. If the user leaves and returns to
                // the app after it has been killed while running in the
                // background, the navigation stack is restored.
                Navigator.restorablePushNamed(
                  context,
                  SampleItemDetailsView.routeName,
                );
              });
        },
      ),
    );
  }
}
