# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 04:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('edgar', '0004_auto_20170706_2035'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='edgarsdfiling',
            options={'verbose_name': 'SD Filing', 'verbose_name_plural': 'SD Filings'},
        ),
    ]
