#Drupal & Square

This presentation is designed to show what the recommended way of integrating Square into Drupal using the [Commerce Square Connect](https://www.drupal.org/project/commerce_square) module.

###Drupal VM

This presentation is built around using [Drupal VM](https://www.drupalvm.com/). Some stemps in creating your VM take a long time and are not suitable for a live presentation environment. 

**Prerequisites**

You'll need [Vagrant](https://www.vagrantup.com/), [VirtualBox](https://www.virtualbox.org/), and probably a host of other stuff. Make sure you get compatabile versions, when I wrote this Vagrant didn't like the latest version of VirtualBox (5.2) so I had to install an older version (5.1). 

You'll also need to generate  a self signed certificate to get rudimentary SSL up and running, so `openssl`

And `composer`

**Installation**

There is a [good video](http://docs.drupalvm.com/en/latest/getting-started/installation-macos/) about how to install DrupalVM, but there are some important additions to get the Drupal - Square integration to work. Basically you'll need to:

* Download [DrupalVM](https://www.drupalvm.com/)
* Generate your self-signed certificate (if you do this from within your `geerlingguy-drupal-vm-...`) directory you can save yourself a copying step. `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout example.key -out example.crt`
* `mv example.drupal.make.yml drupal.make.yml `
* `cp default.config.yml config.yml`
* Its very important you add the  following lines to your `config.yml`:

```yaml
#enable the bcmath PHP extension
php_packages_extra:
  - "php{{ php_version }}-bcmath"

#get some crappy form of SSL going. 
apache_vhosts_ssl:
  - servername: "{{ drupal_domain }}"
    documentroot: "{{ drupal_core_path }}"
    certificate_file: "/vagrant/example.crt"
    certificate_key_file: "/vagrant/example.key"
    extra_parameters: |
          ProxyPassMatch ^/(.*\.php(/.*)?)$ "fcgi://127.0.0.1:9000{{ drupal_core_path }}"
```

No you should be able to run

```bash
vagrant up --provider=virtualbox
```

and wait patentially for everthing to happen. You might have to babysit it to enter your password for networking changes. 

**High Sierra Users**

If you are running MacOS 10.13.0/1 you might need to do all of this in a new blank volume that isn't using `APFS` See [geerlingguy/drupal-vm/issues/1547](https://github.com/geerlingguy/drupal-vm/issues/1547)

------

After you see some green text, you should have a DrupalVM that you can access at **http://dashboard.drupalvm.test**

###Square Commerce Drupal Module

installation is pretty easy with Composer. Get into the drupal directory of your vm and run `composer require drupal/commerce_square`

### Usage

Now you have a [dashboard](http://dashboard.drupalvm.test) that has some good info, and a [drupal instance](drupalvm.test) that you can even sort of access via [https](https://drupalvm.test/)

Login with `admin`:`admin` and enable the commmerce Square module. Then you can do stuff like

* go to http://drupalvm.test/admin/commerce/config/square
* add a payment gateway <https://drupalvm.test/admin/commerce/config/payment-gateways/add>
* add a store
* create a product
* add product to cart, view cart, checkout with testing card. 
* review orders, select order, refund payment. 
* possibly set up side by side views with postman or curl to see how data changes on Square’s side throughout the process.

**Reference**

Set up https : https://github.com/geerlingguy/drupal-vm/pull/438/files

<http://drupalvm.test/admin/commerce/config/square>

A great recorded talk about the subject from the SF Drupal group

https://youtu.be/OV0aJBFAAVo?t=1748

