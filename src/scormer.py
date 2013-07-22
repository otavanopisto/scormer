#!/usr/bin/env python2
# -*- coding: utf-8 -*-

'''
Created on Jul 18, 2013
@author: Ilmo Euro <ilmo.euro@gmail.com>


'''

from bottle import *
import os  # @Reimport
import xml.etree.ElementTree as ET

class Bunch(object):
    pass

homedir = os.path.abspath(os.path.dirname(__file__))
packagedir = os.path.join(homedir, 'packages')
staticdir = os.path.join(homedir, 'static')

def parse_package(scorm_dir):
    package = Bunch()
    tree = ET.parse(packagedir + '/' + scorm_dir + '/imsmanifest.xml')
    ns = "{http://www.imsglobal.org/xsd/imscp_v1p1}"
    imsss = "{http://www.imsglobal.org/xsd/imsss}"
    resources = {}
    for element in tree.findall(".//{0}resource".format(ns)):
        print(element)
        identifier = element.get('identifier')
        url = element.get('href')
        resources[identifier] = url
    package.leaves = []
    for element in tree.findall(".//{0}item[@identifierref]".format(ns)):
        print(element)
        leaf = Bunch()
        leaf.path = list(element)[0].text
        leaf.url = '/packages/' + scorm_dir + '/'
        leaf.url += resources[element.get('identifierref')]
        leaf.url += element.get('parameters', "")
        package.leaves.append(leaf)
    package.objs = []
    for element in tree.findall(".//{0}objective".format(imsss)):
        package.objs.append(element.get("objectiveID"))
    for element in tree.findall(".//{0}primaryObjective".format(imsss)):
        package.objs.append(element.get("objectiveID"))
    return package

@route("/")
@view('index')
def scormer():
    package = None
    if 'scorm_dir' in request.query:
        package = parse_package(request.query['scorm_dir'])
    return {'package': package}

@route('/packages/<path:path>')
def static_package(path):
    return static_file(path, packagedir)

@route('/static/<path:path>')
def static(path):
    return static_file(path, staticdir)

run(host='localhost', port=8080, debug=True)
