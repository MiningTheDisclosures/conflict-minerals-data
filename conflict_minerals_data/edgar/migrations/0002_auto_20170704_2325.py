# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-05 06:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edgar', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='edgarcompanyinfo',
            name='state_of_incorporation',
        ),
        migrations.AddField(
            model_name='edgarsdfiling',
            name='link',
            field=models.TextField(default='TBD'),
            preserve_default=False,
        ),
    ]
