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

  toBeEncrypted = event['to_encrypt'] ? event['to_encrypt'] : ''
  toBeDecrypted = event['to_decrypt'] ? event['to_decrypt'] : ''

  if toBeEncrypted.size > 0
    encryptedLicense = EMCrypt.encrypt(JSON.generate(toBeEncrypted))
    encryptedLicenseWOspaces = encryptedLicense.gsub("\n", "")
    license = {"encrypted" => encryptedLicenseWOspaces}
  elsif toBeDecrypted.size > 0
    puts toBeDecrypted
    license = {"decrypted" => JSON.parse(EMCrypt.decrypt(toBeDecrypted))}
  else
    license = nil
  end

  puts license

  return license
end
