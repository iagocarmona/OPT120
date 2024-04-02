import 'package:flutter/material.dart';

import 'user_item.dart';

class UserItemListView extends StatelessWidget {
  const UserItemListView({
    super.key,
    this.items = const [
      UserItem(
        1,
        "Iago Carmona ",
        'iagoortegacarmona@gmail.com',
      ),
      UserItem(
        2,
        "Joao Carlos",
        'joao@gmail.com',
      ),
      UserItem(
        3,
        "Pedro Almeida dos Santos",
        'pedro@gmail.com',
      ),
    ],
  });

  static const routeName = '/';

  final List<UserItem> items;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Usuários'),
      ),
      body: ListView.builder(
        restorationId: 'sampleItemListView',
        itemCount: items.length,
        itemBuilder: (BuildContext context, int index) {
          final item = items[index];

          return ListTile(
            title: Text(
              item.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            subtitle: Text(
              item.email,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          );
        },
      ),
    );
  }
}
