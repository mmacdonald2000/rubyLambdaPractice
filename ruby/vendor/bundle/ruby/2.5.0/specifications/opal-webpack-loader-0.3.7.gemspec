# -*- encoding: utf-8 -*-
# stub: opal-webpack-loader 0.3.7 ruby lib

Gem::Specification.new do |s|
  s.name = "opal-webpack-loader".freeze
  s.version = "0.3.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jan Biedermann".freeze]
  s.date = "2018-09-07"
  s.description = "Compile server, loader and resolver for building opal ruby packs with webpack.".freeze
  s.email = "jan@kursator.de".freeze
  s.executables = ["opal-webpack-compile-server".freeze]
  s.files = ["bin/opal-webpack-compile-server".freeze]
  s.homepage = "http://hyperstack.org".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.7.8".freeze
  s.summary = "Compile server, loader and resolver for building opal ruby packs with webpack.".freeze

  s.installed_by_version = "2.7.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<opal>.freeze, ["~> 0.11.0"])
      s.add_runtime_dependency(%q<eventmachine>.freeze, ["~> 1.2.7"])
      s.add_runtime_dependency(%q<oj>.freeze, ["~> 3.6.0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    else
      s.add_dependency(%q<opal>.freeze, ["~> 0.11.0"])
      s.add_dependency(%q<eventmachine>.freeze, ["~> 1.2.7"])
      s.add_dependency(%q<oj>.freeze, ["~> 3.6.0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<opal>.freeze, ["~> 0.11.0"])
    s.add_dependency(%q<eventmachine>.freeze, ["~> 1.2.7"])
    s.add_dependency(%q<oj>.freeze, ["~> 3.6.0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
  end
end
