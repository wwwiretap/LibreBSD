import os

def setup_arg_parser(parser):
    caches = {
        'build_repo_cache':'/librebsd-build/librebsd.git',
        'freebsd_repo_cache':'/librebsd-build/trueos.git',
        'ports_repo_cache':'/librebsd-build/ports.git'}
    for opt, path in caches.items():
        if os.path.isdir(path):
            parser.set_defaults(**{opt:path})
        else:
            print "No cache for missing cache for %s -> %s" % (opt, path)
    parser.set_defaults(**{'build_repo':
        'git@gitserver:/git/repos/librebsd-build/librebsd.git'})
    parser.set_defaults(**{'freebsd_repo':
        'git@gitserver:/git/repos/librebsd-build/trueos.git'})
    parser.set_defaults(**{'ports_repo':
        'git@gitserver:/git/repos/librebsd-build/ports.git'})


