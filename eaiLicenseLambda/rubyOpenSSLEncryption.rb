# Encryption for eAI licenses using Ruby native OpenSSL module
# depends on OpenSSL
require 'json/ext'
require 'openssl'
require 'base64'

class EAICrypt

  def EAICrypt.encrypt(input)
    if (input)
      cipher = OpenSSL::Cipher.new 'AES-128-CBC'
      cipher.encrypt
      cipher.key = ENV['CIPHER_KEY']
      cipher.iv = ENV['CIPHER_IV']
      crypt = cipher.update input
      crypt << cipher.final
      result = Base64.encode64(crypt).encode("utf-8")
      return result
    else
      return nil
    end
  end

  def EAICrypt.decrypt(input)
    if (input)
      decipher = OpenSSL::Cipher.new 'AES-128-CBC'
      decipher.decrypt
      decipher.key = ENV['CIPHER_KEY']
      decipher.iv = ENV['CIPHER_IV']
      decrypted = decipher.update(Base64.decode64(input))
      decrypted << decipher.final
      result = decrypted.encode("utf-8")
      return result
    else
      return nil
    end
  end

end

def lambda_handler(event:, context:)
  puts 'eAI License Encryption'
  toencrypt = event['to_encrypt']
  encrypted = EAICrypt.encrypt(toencrypt)
  decrypted = EAICrypt.decrypt(encrypted)
  puts 'Unencrypted STRING'
  puts toencrypt
  puts 'Encrypted STRING'
  puts encrypted
  puts 'Decrypted STRING'
  puts decrypted
  license = event['eai_license']
  puts 'Encrypted LICENSE'
  puts license
  puts 'Decrypted LICENSE'
  puts EAICrypt.decrypt(license)
  return decrypted

end
