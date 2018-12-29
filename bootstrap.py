import os
import shutil
import json

class DbApiBootstraper:
    def __init__(self):
        with open("./config/bootstrap.json") as bsconfig:
            self.config = json.load(bsconfig)
    def getRuntimeDir(self, rel=None):
        return os.path.join(self.config["dirs"]["runtime"], self.config["dirs"]["runtime_dirs"][rel] if rel is not None else ".")
    def getExternalDir(self):
        return self.getRuntimeDir("external")
    def getExternalFromDir(self):
        return self.config["dirs"]["external_from"]
    def clear(self):
        if os.path.exists(self.getExternalDir()):
            shutil.rmtree(self.getExternalDir())
    def createFolders(self):
        os.makedirs(self.getExternalDir())
    def copyFiles(self):
        for folder in self.config["dirs"]["copy"]:
            src = os.path.join(self.getExternalFromDir(), folder)
            dest = os.path.join(self.getExternalDir(), folder)
            shutil.copytree(src, dest)
    def bootstrap(self):
        if not os.path.exists(self.getRuntimeDir()):
            os.makedirs(self.getRuntimeDir())
        self.clear()
        self.createFolders()
        self.copyFiles()

bs = DbApiBootstraper()
bs.bootstrap()