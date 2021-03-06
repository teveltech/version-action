from setuptools import setup
import os
import sys


_here = os.path.abspath(os.path.dirname(__file__))

__version__ = "1.0.1-test-13"

_src_folder = ""
with open("package_utils/src_folder", "r") as f:
    _src_folder = f.readline().rstrip('\n')


if sys.version_info[0] < 3:
    with open(os.path.join(_here, 'README.rst')) as f:
        long_description = f.read()
else:
    with open(os.path.join(_here, 'README.rst'), encoding='utf-8') as f:
        long_description = f.read()

version = {}
with open(os.path.join(_here, _src_folder, 'version.py')) as f:
    exec(f.read(), version)

setup(
    name=_src_folder,
    version=__version__,
    description='wrapps up camera parameters created by HAL',
    long_description=long_description,
    author='Gal Rosenthal',
    author_email='gal@tevel-tech.com',
    install_requires=[
        'pythonGlobals>=1.2.3',
        'loggerWrapper>=1.6.4',
        'sharedMemoryWrapper>=1.5.0',
        'numpy==1.15.0',
    ],
    # url='https://github.com/bast/somepackage',

    
    #There is no need to change bellow, use the decleration files in the package to change
    #src_folder - contains only the name of the source folder
    #cpp_lib.bash - config the conan package name and version
    #src_folder/version.py - config __version__ to matche pypi package wanted version num
    
    license='MPL-2.0',
    packages=[_src_folder],
    package_dir={_src_folder: './' + _src_folder},
    package_data={_src_folder: ["libtarget.so"]},
    include_package_data=True,
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Science/Research',
        'Programming Language :: Python'],
    )
