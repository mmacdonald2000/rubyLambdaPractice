# Encryption for eM licenses using "crypt19-rb" gem
require 'crypt/rijndael'
require 'base64'

class EMCrypt

  def EMCrypt.aes_key
    return Crypt::Rijndael.new(ENV['RIJNDAEL_PASSWORD'])
  end

  def EMCrypt.encrypt(convert)
    if (convert)
      return Base64.encode64(EMCrypt.aes_key.encrypt_string(convert))
    else
      return nil
    end
  end

  def EMCrypt.decrypt(convert)
    if (convert)
      decrypted = EMCrypt.aes_key.decrypt_string(Base64.decode64(convert))
      return decrypted
    else
      return nil
    end
  end

end

def lambda_handler(event:, context:)
  # toencrypt = "test123"
  puts "eM License Encryption"
  toencrypt = event['to_encrypt']
  encrypted = EMCrypt.encrypt(toencrypt)
  decrypted = EMCrypt.decrypt(encrypted)
  puts 'Unencrypted STRING'
  puts toencrypt
  puts 'Encrypted STRING'
  puts encrypted
  puts 'Decrypted STRING'
  puts decrypted
  license = event['em_license']
  puts 'Encrypted LICENSE'
  puts license
  puts 'Decrypted LICENSE'
  puts EMCrypt.decrypt(license)
  return decrypted
end
