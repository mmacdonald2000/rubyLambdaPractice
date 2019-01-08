# -*- encoding: utf-8 -*-
# stub: crypt19-rb 1.3.1 ruby lib

Gem::Specification.new do |s|
  s.name = "crypt19-rb".freeze
  s.version = "1.3.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jonathan Rudenberg".freeze, "Richard Kernahan".freeze, "Maximilian Haack".freeze]
  s.date = "2013-08-13"
  s.description = "Crypt is a pure-ruby implementation of a number of popular encryption algorithms. Block cyphers currently include Blowfish, GOST, IDEA, Rijndael (AES), and RC6. Cypher Block Chaining (CBC) has been implemented.".freeze
  s.email = ["mxhaack@gmail.com".freeze]
  s.homepage = "https://github.com/coffeejunk/crypt19".freeze
  s.rubygems_version = "2.7.8".freeze
  s.summary = "Crypt is a pure-ruby implementation of a number of popular encryption algorithms.".freeze

  s.installed_by_version = "2.7.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0.3"])
    else
      s.add_dependency(%q<rake>.freeze, ["~> 10.0.3"])
    end
  else
    s.add_dependency(%q<rake>.freeze, ["~> 10.0.3"])
  end
end
