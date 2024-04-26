import 'package:flutter/material.dart';

import 'activities/activity_item_list_view.dart';
import 'users/user_item_list_view.dart';

class Home extends StatefulWidget {
  const Home({
    super.key,
  });

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _currentIndex = 0;

  final tabs = [const ActivityItemListView(), const UserItemListView()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: tabs[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        type: BottomNavigationBarType.fixed,
        selectedFontSize: 16,
        selectedItemColor: Colors.deepOrange.shade500,
        unselectedItemColor: Colors.white54,
        unselectedFontSize: 12,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.assignment),
            label: "Atividades",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: "Usuários",
          )
        ],
        onTap: (index) => {
          setState(() {
            _currentIndex = index;
          })
        },
      ),
    );
  }
}
