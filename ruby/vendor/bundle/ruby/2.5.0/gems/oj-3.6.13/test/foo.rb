#!/usr/bin/env ruby

$: << '.'
$: << '../lib'
$: << '../ext'

require 'oj'

#Oj.load(StringIO.new(Oj.dump({ records: 1.upto(25).map{|i| { id: i, name: "record_#{i}" }} }, mode: :strict)))

class MyParser
  attr_accessor :enum

  def initialize
    @io = StringIO.new
    @writer = Oj::StreamWriter.new(@io)

    json_string = Oj.dump({ records: 1.upto(25).map{|i| { id: i, name: "record_#{i}" }} }, mode: :strict)
    @test_json = StringIO.new(json_string)

    @enum = Enumerator.new do |yielder|
      @yielder = yielder
      Oj.sc_parse(self, @test_json)
    end
  end

  # Stream parsing methods
  def hash_start
    @writer.push_object
  end

  def hash_end
    @writer.pop unless @io.eof
  end

  def hash_key(key)
    @writer.push_key(key)
  end

  def hash_set(h, key, value)
    @writer.push_value(value)
  end

  def array_start
    @writer.push_array
  end

  def array_end
    @writer.pop
  end

  def array_append(a, value)
    yield_data
  end

  def add_value(value);end

  def yield_data
    @writer.pop_all
    @yielder << @io.string
    @io.reopen("")
    array_start
  end
end

MyParser.new.enum.each.with_index do |r, i|
  break if i == 0
end


