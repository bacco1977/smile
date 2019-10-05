# smile
Machine learning cranio-facial surgery quality software

## Installation Guide for Macbooks

## Python installation

The system needs to install Python 3.5.5
We suggest to pyenv to manage multiple Python installations.
Since we will be using Homebrew manager to install our Python manager, here's a quick tutorial on how to install Homebrew(http://www.chrisjmendez.com/2016/01/10/installing-homebrew-on-mac-os-x/) for Mac users.

Update homebrew
```
brew update
```

Intall pyenv

```
brew install pyenv
```

Configure the mac environment

```
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile

```

Activate it

```
source ~/.bash_profile
```



### Project download

For non developers, we suggest to download the following zip file


### Model configuration

Open terminal

Download the following file predictors file: 

https://www.dropbox.com/s/366h882j9jj47lx/shape_predictor.dat?dl=0


Download the model file: 


https://www.dropbox.com/s/b6jnvdzuajs3qsq/vgg_face_weights.h5?dl=0



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
