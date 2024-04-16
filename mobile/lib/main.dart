import 'package:flutter/material.dart';
import 'package:localstorage/localstorage.dart';
import 'src/app.dart';

void main() async {
  await initLocalStorage();

  runApp(const MyApp());
}
