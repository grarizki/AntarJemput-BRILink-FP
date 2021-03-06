env: standard
runtime: nodejs14
instance_class: F1
automatic_scaling:
  max_instances: 1
  min_instances: 0
  target_cpu_utilization: 0.9
service: $TEAM_NAME
handlers:
  - url: /static
    static_dir: build/static
  - url: /(.*\.(json|ico|js))$
    static_files: build/\1
    upload: build/.*\.(json|ico|js)$
  - url: .*
    static_files: build/index.html
    upload: build/index.html

