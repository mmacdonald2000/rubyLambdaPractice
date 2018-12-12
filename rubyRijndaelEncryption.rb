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
  toencrypt = "test123"
  toencrypt = event['key2']
  encrypted = EMCrypt.encrypt(toencrypt)
  decrypted = EMCrypt.decrypt(encrypted)
  puts toencrypt
  puts encrypted
  puts decrypted
  license = event['license']
  puts license
  puts EMCrypt.decrypt(license)
  return decrypted
end
