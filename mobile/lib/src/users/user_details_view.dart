import 'package:flutter/material.dart';

/// Displays detailed information about a SampleItem.
class UserItemDetailsView extends StatelessWidget {
  const UserItemDetailsView({super.key});

  static const routeName = '/user_item';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalhe do usuário'),
      ),
      body: const Center(
        child: Text('More Information Here'),
      ),
    );
  }
}
