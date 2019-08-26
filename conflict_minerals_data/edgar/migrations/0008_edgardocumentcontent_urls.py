# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-14 06:27
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edgar', '0007_auto_20170706_2215'),
    ]

    operations = [
        migrations.AddField(
            model_name='edgardocumentcontent',
            name='urls',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True), blank=True, help_text='URL we parsed out of the content', null=True, size=None),
        ),
    ]